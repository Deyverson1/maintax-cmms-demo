import { useEffect, useState } from "react";
import { supabase } from "../utility/supabase";

export function useKpis({ refresh }) {
  const [kpiData, setKpiData] = useState({
    active: 0,
    thisMonth: 0,
    monthlySpend: 0,
  });
  useEffect(() => {
    async function fetchKpis() {
      const now = new Date();
      const firstDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
      ).toISOString();

      const { count: active } = await supabase
        .from("requisitions")
        .select("*", { count: "exact", head: true })
        .in("requisition_status", ["Pendiente", "En Revisión"]);

      const { count: thisMonth } = await supabase
        .from("requisitions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", firstDay);

      const { data: spendData } = await supabase
        .from("requisitions")
        .select("total_value")
        .eq("requisition_status", "Aprobado")
        .gte("created_at", firstDay);

      const monthlySpend =
        spendData?.reduce(
          (sum, r) => sum + r.total_value + r.total_value * 0.19,
          0,
        ) || 0;

      const formatCompact = (value) => {
        if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
        return `$${value}`;
      };

      const monthlySpendFinal = formatCompact(monthlySpend);

      setKpiData({ active, thisMonth, monthlySpendFinal, monthlySpend });
    }

    fetchKpis();
  }, [refresh]);
  return { kpiData };
}

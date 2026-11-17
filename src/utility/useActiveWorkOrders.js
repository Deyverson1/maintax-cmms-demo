import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useActiveWorkOrders() {
  //Ordenes de trabajo activas
  const [activeWorkOrders, setActiveWorkOrders] = useState([]);

  useEffect(() => {
    const fetchActiveWorkOrders = async () => {
      const { data, error } = await supabase
        .from("work-orders")
        .select("*")
        .neq("status", "Completado")
        .neq("status", "Cancelado")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error:", error);
      } else {
        setActiveWorkOrders(data);
      }
    };

    fetchActiveWorkOrders();
  }, []);

  return { activeWorkOrders };
}

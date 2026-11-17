import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function usePriorityOrders() {
  //Ordenes de trabajo activas
  const [priorityOrders, setPriorityOrders] = useState();

  useEffect(() => {
    const fetchPriorityOrders = async () => {
      const { data, error } = await supabase
        .from("work-orders")
        .select("*")
        .neq("status", "Completado")
        .neq("status", "Cancelado")
        .eq("priority", "Urgente")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error:", error);
      } else {
        setPriorityOrders(data);
      }
    };

    fetchPriorityOrders();
  }, []);

  return { priorityOrders };
}

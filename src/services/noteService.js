import { supabase } from "../utility/supabase";

export async function createNote({
  title,
  description,
  startDate,

  finalDate,
  days,
  category,
}) {
  const { error } = await supabase.from("notes").insert({
    title: title,
    description: description,
    start_date: startDate,
    days,
    final_date: finalDate,
    category,
  });

  if (error) throw error;
}

import { createClient } from "@supabase/supabase-js";
const API_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(API_URL, API_KEY);

export async function getAllMessages() {
  const { data, error } = await supabase
    .from("message")
    .select("*")
    .order("id_message", { ascending: true });
  return { data, error };
}

interface MessageProps {
  id_pokemon: number;
  nm_pokemon: string;
  ds_message: string;
}

export async function insertMessage(message: MessageProps) {
  const { data, error } = await supabase.from("message").insert([message]);
  return { data, error };
}

"use server";
import { supabase } from "@/lib/supabaseClient";

export const checkUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message);
    return false;
  } else if (!data.user) {
    return false;
  } else {
    return true;
  }
};

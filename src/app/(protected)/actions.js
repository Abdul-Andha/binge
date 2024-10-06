"use server";
import { supabase } from "@/lib/supabaseClient";

export const checkUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return false;
  } else if (!data.user) {
    return false;
  } else {
    return data.user;
  }
};

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()

  if(error){
    return false
  } else {
    return true;
  }
}

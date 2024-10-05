"use server";
import { supabase } from '../../lib/supabaseClient';

export const signup = async (formData) => {

  try {
    const { error } = await supabase.auth.signInWithPassword(formData);
    if (error) {
      throw error;
    }

    const user = (await supabase.auth.getUser()).data.user;
    return user;
  } catch (error) {
    throw error;
  }

}
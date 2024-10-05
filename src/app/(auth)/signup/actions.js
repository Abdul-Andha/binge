"use server";
import { supabase } from "@/lib/supabaseClient";

export const signup = async (formData) => {
  const { name, email, password } = formData;

  try {
    // check if email ends in .edu
    if (!email.endsWith(".edu"))
      throw new Error("You must sign up with a .edu email address");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
      data: { name },
    });
    if (error) {
      throw error;
    }

    const user = (await supabase.auth.getUser()).data.user;
    return user;
  } catch (error) {
    throw error;
  }
};

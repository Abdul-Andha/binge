"use client"
// Want to make any page under this folder (protected) not be accessible by non-users
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
          const { data, error } = await supabase.auth.getUser();
    
          if (error) {
            console.error("Error fetching user:", error.message);
            router.push("/login");
          } else if (!data.user) {
            router.push("/login");
          } else {
            setIsLoading(false);
          }
        };
    
        checkUser();
      }, [router]);

      if (isLoading) {
        return (
          <div className="w-full h-screen flex justify-center items-center">
            Loading...
          </div>
        );
      }


    return (
        <div>
            {children}
        </div>
    )
}

"use client"
// Want to make any page under this folder (protected) not be accessible by non-users
import { useState, useEffect } from "react";
import { checkUser } from "./actions";

export default function Layout({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkIfUserExists() {
            const user = await checkUser();
            
            if(user === false){
                console.log("error:", data.error)
            }
            else {
                setIsLoading(false);
            }
        }

        checkIfUserExists();
      }, []);

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

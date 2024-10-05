"use client"
// Want to make any page under this folder (protected) not be accessible by non-users
import { useState, useEffect } from "react";
import { checkUser } from "./actions";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function checkIfUserExists() {
            const user = await checkUser();
            if (user === false) {
                console.log("error:", user);
                router.push("/login")
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

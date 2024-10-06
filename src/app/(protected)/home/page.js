"use client"
import { Button } from "antd"
import { useRouter } from "next/navigation"

export default function Home(){
    const router = useRouter();
    return (
        <div>
            <Button onClick={() => router.push("/create")}>Create Livestream</Button>
        </div>

    )
}
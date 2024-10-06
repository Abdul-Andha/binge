'use client'

import { useEffect } from "react"
export default function Home() {
        useEffect(()=>{
            const getAudioFile = async () => {
                const uploadRequest = await fetch("/api/files/allFiles", {
                    method: "GET",
                });
                const responseData = await uploadRequest.json()
                console.log(responseData)
            }
        getAudioFile()
    },[])
    return (
        <>
            <div>Home</div>
        </>
    )
}
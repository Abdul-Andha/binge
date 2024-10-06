"use client";

import React from 'react';
import SearchBar from './_components/search';
import Trending from './_components/trending';

export default function Home() {
    // useEffect(() => {
    //     const getAudioFile = async () => {
    //         const uploadRequest = await fetch("/api/files/allFiles", {
    //             method: "GET",
    //         });
    //         const responseData = await uploadRequest.json()
    //         console.log(responseData)
    //     }
    //     getAudioFile()
    // }, [])
    return (
        <div className="flex flex-col items-center">
            <div>Navbar goes here</div>

            <SearchBar />
            <Trending />
        </div>
    );
}
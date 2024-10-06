"use client";

import React from 'react';
import SearchBar from './_components/search';
import Trending from './_components/trending';

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <div>Navbar goes here</div>

            <SearchBar />
            <Trending />
        </div>
    );
}
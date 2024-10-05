"use client";

import React from 'react';
import SearchBar from './_components/search';

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <div>Navbar goes here</div>

            <SearchBar />
        </div>
    );
}
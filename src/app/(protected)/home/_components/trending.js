"use client";

import React, { useState, useEffect } from 'react';
import { getTrending } from './../actions';
import PodcastItem from './podcastItem';

const Trending = () => {
    const [loading, setLoading] = useState(false);
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        async function fetchTrending() {
            setLoading(true);
            const trendingData = await getTrending();
            setTrending(trendingData);
            setLoading(false);
        }

        fetchTrending();
    }, []);

    return (
        <div className="w-96 max-w-md mt-4">
            <div className="text-2xl font-bold">Most Popular</div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                trending.map((item) => (
                    <PodcastItem
                        key={item.name}
                        name={item.name}
                        views={item.views}
                        thumbnail={item.thumbnail}
                    />
                ))
            )}
        </div>
    );
};

export default Trending;
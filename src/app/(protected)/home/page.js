"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const handleNavigation = () => {
        router.push('/livestream');
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4">Home</h1>
            {/* Button to navigate to the livestream page */}
            <button
                onClick={handleNavigation}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
                Go to Livestream
            </button>
        </div>
    );
}
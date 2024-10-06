"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

export default function Home() {
  const router = useRouter(); // Initialize router

  const handleLoginClick = () => {
    router.push("/login"); // Navigate to the login page
  };

  const handleSignUpClick = () => {
    router.push("/signup"); // Navigate to the signup page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Title and Description */}
        <h1 style={{ color: '#9E6AE7' }} className="text-6xl mb-2">BINGE</h1>
        <p style={{ color: '#9E6AE7' }} className="text-lg mb-8">A podcast for students by students</p>

      {/* Image */}
      <img
        src="https://static.vecteezy.com/system/resources/previews/013/789/380/original/two-men-talking-on-live-streaming-concept-of-podcast-in-studio-people-in-headphones-on-interview-broadcast-recording-audio-black-and-white-guys-vector.jpg" // Adjust the path if necessary
        alt="Landing Page"
        className="mb-8 w-96 h-auto object-cover"
      />

      {/* Buttons */}
      <div className="space-y-4 text-center">
        <div className="login-btn">
          <button
            onClick={handleLoginClick} // Attach onClick handler
            className="relative inline-flex items-center justify-center w-48 p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              Login
            </span>
            <span className="relative invisible">Button Text</span>
          </button>
        </div>

        <div className="signup-btn">
          <button
            onClick={handleSignUpClick} // Attach onClick handler
            className="relative inline-flex items-center justify-center w-48 p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              Sign up
            </span>
            <span className="relative invisible">Button Text</span>
          </button>
        </div>
      </div>
    </div>
  );
}

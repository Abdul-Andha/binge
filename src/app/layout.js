"use client"
import { UserProvider } from "./context/userAuth";
import "./globals.css";
import { PlaybackProvider } from "./context/playbackContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="w-full h-screen p-4"
      >
        <UserProvider>
        <PlaybackProvider>
          {children}
          </PlaybackProvider>
        </UserProvider>
      </body>
    </html>
  );
}

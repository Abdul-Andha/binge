"use client"
import { UserProvider } from "./context/userAuth";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="w-full h-screen p-4"
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}

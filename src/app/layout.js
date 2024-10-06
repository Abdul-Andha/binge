"use client";
import { NewsKitProvider, newskitLightTheme } from "newskit";



export default function RootLayout({ children }) {
  return (
    // <NewsKitProvider
    //   theme={newskitLightTheme}
    //   instrumentation={"instrumentation provider props"}
    //   layer={"layer organizer props"}
    // >
      <html lang="en">
      <body className="w-full h-screen p-4">{children}</body>
      </html>
    // </NewsKitProvider>
  );
}

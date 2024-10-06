"use client";

import React, { useState } from "react";

export default function Home() {
  const [file, setFile] = useState();
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      console.log(signedUrl)
      setUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
      {/* <input type="file" onChange={handleChange} />
      <button disabled={uploading} onClick={uploadFile}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {url && <img src={url} alt="Image from Pinata" />} */}
    </main>
  );
}

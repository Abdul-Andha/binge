import { NextResponse } from "next/server";
import { pinata } from "@/app/utils/config"; // Ensure pinata is imported correctly

export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to check if a file name has a valid audio extension
function hasValidAudioExtension(fileName) {
  const regex = /\.(mp3|wav|aac|flac|alac|ogg|wma|aiff|pcm|opus|amr|atrac|dts|dsd|midi|m4a|webm)$/i;
  return regex.test(fileName);
}

export async function GET() {
  try {
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${process.env.PINATA_JWT}` },
    };

    const response = await fetch("https://api.pinata.cloud/v3/files", options);

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error fetching from Pinata:", response.status, errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const responseData = await response.json();

    // Filter files with valid audio extensions
    const filteredArray = responseData.data.files.filter((file) =>
      hasValidAudioExtension(file.name)
    );

    // Create an array of CIDs from the filtered files
    const cidArray = filteredArray.map((file) => file.cid);

    // Create signed URLs
    const signedUrls = await Promise.all(
      cidArray.map(async (cid) => {
        const url = await pinata.gateways.createSignedURL({
          cid: cid,
          expires: 3600,
        });
        return url;
      })
    );

    // Map the signed URLs back to the original files
    const filesWithSignedUrls = filteredArray.map((file, index) => ({
      ...file,
      signedUrl: signedUrls[index], // Add the signed URL to the original file object
    }));

    // Return the modified response including the signed URLs
    return NextResponse.json({ files: filesWithSignedUrls }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

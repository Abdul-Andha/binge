'use server';

export async function uploadToPinata(blob) {
  try {
    const title = "audio";
    const formData = new FormData();
    formData.append("file", blob, title + ".webm");
    console.log('uploading', formData);
    const uploadResponse = await fetch('/api/files', {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file");
    }

    const result = await uploadResponse.json();
    console.log("Uploaded successfully:", result);
    return result;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
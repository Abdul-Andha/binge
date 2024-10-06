"use client";

import { usePlayback } from "@/app/context/playbackContext";
import { Button } from "antd";

export default function Home() {
  const { playTrack } = usePlayback();

  return (
    <>
      <Button
        onClick={() => {
          playTrack({
            id: 1123,
            name: "Japanese Song",
            artist: "Johan Delao",
            audioUrl: "https://teal-immediate-lemming-619.mypinata.cloud/files/bafybeieonk542hkdm252ycxznk62xtvqzrckuoh5sprj7iwcngnc6fayea?X-Algorithm=PINATA1&X-Date=1728208744&X-Expires=3600&X-Method=GET&X-Signature=a4c7efaeece38e6e08682575becf337d36df7858326d448ff1bda833b0a431a9",
          });
        }}
      >
        Play Song
      </Button>
    </>
  );
}

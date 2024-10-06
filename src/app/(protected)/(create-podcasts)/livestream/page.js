"use client";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const generateRandomUID = () => {
  return Math.floor(Math.random() * 1000000); // Generate a random number as UID
};

export default function Livestream() {
  const [rtc, setRtc] = useState({
    client: AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }),
    localAudioTrack: null,
  });
  const [isJoined, setIsJoined] = useState(false);
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const channelName = searchParams.get("channelName");

  let clientRoleOptions = { level: 2 };

  let options = {
    // Pass your app ID here.
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID,
    // Set the channel name.
    channel: channelName,
    // Use a temp token
    token: null,
    // Set the user ID.
    uid: generateRandomUID(),
  };

  const handleHostJoin = async () => {
    if (isJoined) {
      console.warn("Already joined the channel");
      return;
    }

    try {
      // Join the RTC channel
      await rtc.client.join(
        options.appId,
        options.channel,
        options.token,
        options.uid
      );

      // Create local audio track for the host (microphone)
      const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      setRtc((prevRtc) => ({
        ...prevRtc,
        localAudioTrack: localAudioTrack,
      }));

      // Publish the local audio track to the channel
      await rtc.client.publish([localAudioTrack]);
      console.log("Host audio track published successfully!");

      // Listen for remote users publishing their streams
      rtc.client.on("user-published", async (user, mediaType) => {
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");

        // If the remote user publishes an audio track, play it
        if (mediaType === "audio") {
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack.play(); // Play the remote audio
        }
      });

      // Mark as joined
      setIsJoined(true);
    } catch (error) {
      console.error("Failed to join and publish the audio: ", error);
    }
  };

  const handleAudienceJoin = async () => {
    if (isJoined) {
      console.warn("Already joined the channel");
      return;
    }

    try {
      // Set the client role to audience before joining
      await rtc.client.setClientRole("audience", clientRoleOptions);

      // Join the RTC channel as an audience
      await rtc.client.join(
        options.appId,
        options.channel,
        options.token,
        options.uid
      );

      console.log("Joined as audience!");

      // Subscribe to remote users' media streams when they are published
      rtc.client.on("user-published", async (user, mediaType) => {
        try {
          await rtc.client.subscribe(user, mediaType);
          console.log("subscribe success to user:", user.uid);

          // Play audio if it's an audio stream
          if (mediaType === "audio") {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack.play(); // Play the remote audio
          }
        } catch (err) {
          console.error(
            "Failed to subscribe to user:",
            user.uid,
            "error:",
            err
          );
        }
      });

      // Mark as joined
      setIsJoined(true);
    } catch (error) {
      console.error("Failed to join as audience: ", error);
    }
  };

  useEffect(() => {
    if (role === "host") {
      handleHostJoin();
    } else {
      handleAudienceJoin();
    }

    // Perform cleanup on unmount (e.g., leaving the channel)
    return () => {
      if (rtc.client) {
        rtc.client.leave().then(() => console.log("Client left the channel"));
      }
    };
  }, [rtc.client, role, channelName]);

  return <div>Did we win?</div>;
}

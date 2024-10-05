"use client";

import React, { useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng"; // Make sure you have the SDK installed

const Audio = ({ channelName }) => {
    const client = AgoraRTC.createClient({ mode: "live", codec: "h264" });

    useEffect(() => {
        const joinAudioChannel = async () => {
            try {
                const token = null; // Replace with your token logic if applicable
                const uid = await client.join(process.env.NEXT_PUBLIC_AGORA_APP_ID, channelName, token, null);
                
                const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                await client.publish([localAudioTrack]);
                console.log("Local audio track published");

                // Additional logic to handle remote users can be added here
            } catch (error) {
                console.error("Error joining audio channel:", error);
            }
        };

        joinAudioChannel();

        // Cleanup function to leave the channel when the component unmounts
        return () => {
            client.leave();
        };
    }, [channelName, client]);

    return <div className="text-center">Broadcasting Audio...</div>;
};

export default Audio;
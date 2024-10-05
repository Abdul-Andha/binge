"use client";

import React, { useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng"; // Make sure you have the SDK installed
import Audio from "./Audio"; // Import the Audio component

const appId = "b65a4yeab2mq";
const Call = ({ appId, channelName, episodeName, description, selectedPodcast }) => {
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const client = AgoraRTC.createClient({ mode: "live", codec: "h264" });

    const handleBroadcastStart = async () => {
        if (!isBroadcasting) {
            try {
                const token = null; // Replace with your token logic if applicable
                const uid = await client.join(appId, channelName, token, null);
                console.log("Successfully joined channel:", channelName, "with UID:", uid);
                
                setIsBroadcasting(true);
                console.log("Broadcasting episode:", episodeName, "Description:", description, "Podcast Category:", selectedPodcast);
                
                // Additional logic to handle broadcasting would go here
            } catch (error) {
                console.error("Error starting broadcast:", error);
            }
        }
    };

    return (
        <div>
            <button
                className="px-5 py-3 my-5 text-base font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500"
                onClick={handleBroadcastStart}
            >
                Start Audio Broadcast
            </button>

            {isBroadcasting && <Audio channelName={channelName} />}
        </div>
    );
};

export default Call;
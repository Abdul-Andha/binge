import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { usePlayback } from "@/app/context/playbackContext";

const PodcastItem = ({ name, views, thumbnail, audio }) => {
  const { playTrack } = usePlayback();

  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center space-x-4">
        <img src={thumbnail} alt={`${name} thumbnail`} className="w-16 h-16 rounded" />
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-gray-500">{views} views</div>
        </div>
      </div>
      {/* Play button icon from Ant Design */}
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 border-purple-500 border-2 rounded-full cursor-pointer" onClick={() => {
          playTrack({
            id: 1123,
            name: name,
            artist: "Bob",
            audioUrl: audio,
          })
        }}>
          <CaretRightOutlined className="text-purple-500" style={{ fontSize: '24px' }} />
        </div>
      </div>
    </div>
  );
};

export default PodcastItem;
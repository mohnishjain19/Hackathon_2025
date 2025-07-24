import React, { useRef, useState } from "react";
import VideoPreview from "./VideoPreview";
import video1 from "./Videos/video1.mp4";
import video2 from "./Videos/video2.mp4";
import video3 from "./Videos/video3.mp4";

const videos = [
  { id: 1, src: video1, title: "Video 1" },
  { id: 2, src: video2, title: "Video 2" },
  { id: 3, src: video3, title: "Video 3" },
];

export const Home: React.FC = () => {
  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  const [currentReset, setCurrentReset] = useState<(() => void) | null>(null);

  const handleNewVideoClick = (
    videoEl: HTMLVideoElement,
    resetFunc: () => void
  ) => {
    if (currentVideoRef.current && currentVideoRef.current !== videoEl) {
      // Only reset if it's a different video
      currentVideoRef.current.pause();
      currentVideoRef.current.currentTime = 0;
      currentVideoRef.current.muted = true;
      currentReset?.();
    }
  
    // Update current
    currentVideoRef.current = videoEl;
    setCurrentReset(() => resetFunc);
  };

  return (
    <div className="flex overflow-x-auto space-x-4 p-4 w-full">
  <div className="flex space-x-4 min-w-max">
    {videos.map((video) => (
      <VideoPreview
        key={video.id}
        src={video.src}
        title={video.title}
        onVideoClick={handleNewVideoClick}
      />
    ))}
  </div>
</div>
  );
};


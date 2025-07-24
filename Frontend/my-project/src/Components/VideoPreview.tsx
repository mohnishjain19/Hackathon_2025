import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface Props {
  src: string;
  title: string;
  isActive: boolean;
  onVideoClick: (videoEl: HTMLVideoElement, resetFunc: () => void) => void;
  registerReset: (reset: () => void) => void;
}

const VideoPreview: React.FC<Props> = ({
  src,
  title,
  isActive,
  onVideoClick,
  registerReset,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetVideo = () => {
    setIsClicked(false);
    setShowOverlay(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
    }
  };

  useEffect(() => {
    registerReset(resetVideo);
  }, []);

  useEffect(() => {
    if (isActive && !isClicked && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.play().catch(console.error);

      timeoutRef.current = setTimeout(() => {
        if (!isClicked && videoRef.current) {
          videoRef.current.pause();
          setShowOverlay(true);
        }
      }, 10000);
    } else if (!isActive && !isClicked) {
      resetVideo();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [isActive]);

  const handleClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (videoRef.current) {
      onVideoClick(videoRef.current, resetVideo);
      setIsClicked(true);
      setShowOverlay(false);
      videoRef.current.muted = false;
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <div
      className={clsx(
        "relative transition-transform duration-300 ease-in-out cursor-pointer rounded-xl shadow-lg bg-black",
        (isActive || isClicked) ? "scale-110 z-10" : "scale-100 opacity-80"
      )}
      style={{ width: isActive || isClicked ? "300px" : "256px" }}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        className="rounded-xl w-full h-[180px] object-cover"
        controls={isClicked}
      />
      {showOverlay && !isClicked && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-sm font-medium rounded-xl z-20">
          Click to watch full video
        </div>
      )}
      <p className="mt-2 text-center text-white font-medium">{title}</p>
    </div>

  );
};

export default VideoPreview;

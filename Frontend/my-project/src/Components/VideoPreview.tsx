import React, { useRef, useState } from "react";
import clsx from "clsx";

interface Props {
  src: string;
  title: string;
  onVideoClick: (videoEl: HTMLVideoElement, resetFunc: () => void) => void;
}

const VideoPreview: React.FC<Props> = ({ src, title, onVideoClick }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetVideo = () => {
    setIsClicked(false);
    setIsHovered(false);
    setShowOverlay(false);
  };

  const handleMouseEnter = () => {
    if (isClicked) return;
    setIsHovered(true);
    setShowOverlay(false);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.play().catch(console.error);

      timeoutRef.current = setTimeout(() => {
        if (!isClicked && videoRef.current) {
          videoRef.current.pause();
          setShowOverlay(true);
        }
      }, 10000);
    }
  };

  const handleMouseLeave = () => {
    if (isClicked) return;
    setIsHovered(false);
    setShowOverlay(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

const handleClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (videoRef.current) {
      // 👇 Notify parent to reset other videos
      onVideoClick(videoRef.current, resetVideo);

      setIsClicked(true);
      setIsHovered(false);
      setShowOverlay(false);

      videoRef.current.muted = false;
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <div
      className={clsx(
        "relative transition-transform duration-300 ease-in-out cursor-pointer",
        (isHovered || isClicked) ? "scale-110 z-10" : "scale-100"
      )}
      style={{ width: isHovered || isClicked ? "300px" : "256px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        className="rounded-lg w-full h-40 object-cover"
        controls={isClicked}
      />
      {showOverlay && !isClicked && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-sm font-medium rounded-lg z-20">
          Click to watch full video
        </div>
      )}
      <p className="mt-1 text-sm text-center">{title}</p>
    </div>
  );
};

export default VideoPreview;
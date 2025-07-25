// VideoPreview.tsx
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface Props {
  src: string;
  title: string;
  isActive: boolean;
  isHovered: boolean;
  isHoveredGlobally: boolean;
  onHover: () => void;
  onUnhover: () => void;
  onVideoClick: (videoEl: HTMLVideoElement, resetFunc: () => void) => void;
  setRef: (el: HTMLVideoElement | null) => void;
  registerReset: (reset: () => void) => void;
}

const VideoPreview: React.FC<Props> = ({
  src,
  title,
  isActive,
  isHovered,
  isHoveredGlobally,
  onHover,
  onUnhover,
  onVideoClick,
  setRef,
  registerReset,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  const resetVideo = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    setRef(videoRef.current);
    registerReset(resetVideo);
  }, []);

  const handleMouseEnter = () => {
    if (!isClicked) onHover();
  };

  const handleMouseLeave = () => {
    if (!isClicked) onUnhover();
  };


  // const handleClick = () => {
    // if (timeoutRef.current) clearTimeout(timeoutRef.current);
  
    // if (videoRef.current) {
    //   // 👇 Notify parent to reset other videos
    //   onVideoClick(videoRef.current, resetVideo);
  
    //   setIsClicked(true);
    //   setIsHovered(false);
    //   setShowOverlay(false);
  
    //   videoRef.current.muted = false;
    //   videoRef.current.play().catch(console.error);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      setIsClicked(true);
      onVideoClick(videoRef.current, resetVideo);
    }
  };

  // Enlarge only if clicked OR hovered
  // If nothing is hovered, then the active one should enlarge
  const isEnlarged = isClicked || isHovered || (!isHoveredGlobally && isActive);

  return (
    <div
      className={clsx(
        "relative transition-transform duration-300 cursor-pointer",
        isEnlarged ? "scale-[1.25] z-20" : "scale-100"
      )}
      style={{
        minWidth: "280px",
        width: "clamp(25vw, 50vw,25vw)",
        maxWidth: "100%",
        scrollSnapAlign: "start",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        className={clsx(
          "rounded-lg w-full object-cover",
          isClicked ? "aspect-video max-h-[60vh]" : "aspect-video max-h-[40vh]"
        )}
        controls={isClicked}
        muted
      />
      <p className="mt-1 text-base text-center text-gray-800">{title}</p>
    </div>
  );
};

export default VideoPreview;
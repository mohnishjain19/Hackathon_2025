// Home.tsx
import  { useEffect, useRef, useState } from "react";
import VideoPreview from "./VideoPreview";
import video1 from "./Videos/video1.mp4";
import video2 from "./Videos/video2.mp4";
import video3 from "./Videos/video3.mp4";

const videos = [
  { id: 1, src: video1 },
  { id: 2, src: video2 },
  { id: 3, src: video3 },
];

export const Home: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const resetFuncs = useRef<(() => void)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoClickedRef = useRef(false);

  const startCarousel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length);
    }, 10000);
  };

  const stopCarousel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!isCarouselPaused) {
      startCarousel();
    } else {
      stopCarousel();
    }
    return () => stopCarousel();
  }, [isCarouselPaused]);

  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
        vid.muted = true;
      }
      resetFuncs.current[idx]?.();
    });

    const currentVid = videoRefs.current[activeIndex];
    if (currentVid) {
      currentVid.play().catch(console.error);
    }
  }, [activeIndex]);

  const handleVideoClick = (
videoEl: HTMLVideoElement,
index: number  ) => {
    stopCarousel();
    setIsCarouselPaused(true);
    setActiveIndex(index);

    videoRefs.current.forEach((vid, idx) => {
      if (vid && vid !== videoEl) {
        vid.pause();
        vid.currentTime = 0;
        vid.muted = true;
      }
      if (resetFuncs.current[idx] && idx !== index) resetFuncs.current[idx]();
    });

    videoEl.muted = false;
    videoEl.play().catch(console.error);
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (videoContainerRef.current?.contains(e.target as Node)) {
        videoClickedRef.current = true;
      } else {
        videoClickedRef.current = false;
      }
    };

    const handleClick = () => {
      if (!videoClickedRef.current) {
        stopCarousel();
        setActiveIndex((prev) => {
          const nextIndex = (prev + 1) % videos.length;
          setTimeout(() => {
            setIsCarouselPaused(false);
            startCarousel();
          }, 0);
          return nextIndex;
        });
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="w-full py-4 px-6">
      <div
        className="flex justify-center items-start gap-8 w-full max-w-screen-xl mx-auto px-4 overflow-x-auto"
        ref={videoContainerRef}
        style={{
          height: "auto",
          minHeight: "40vh",
          alignItems: "center",
        }}
      >
        {videos.map((video, idx) => (
          <VideoPreview
            key={video.id}
            src={video.src}
            isActive={idx === activeIndex}
            isHovered={idx === hoveredIndex}
            isHoveredGlobally={hoveredIndex !== null}
            onHover={() => setHoveredIndex(idx)}
            onUnhover={() => setHoveredIndex(null)}
            onVideoClick={(el) => handleVideoClick(el, idx)}
            setRef={(el) => (videoRefs.current[idx] = el)}
            registerReset={(reset) => (resetFuncs.current[idx] = reset)} title={""}/>
        ))}
      </div>
    </div>
  );
};


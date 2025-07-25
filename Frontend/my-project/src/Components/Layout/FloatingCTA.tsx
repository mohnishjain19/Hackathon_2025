import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import { useEffect, useState } from "react";
import type { LanguageCode } from "../../locales";


interface FloatingCTAProps {
  lang: LanguageCode;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = () => {

  const [bounce, setBounce] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBounce(false);
    }, 5000); // stop bouncing after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 group">
      <Link
        to="/form"
        className={`bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 font-semibold flex items-center space-x-2 ${
          bounce ? "animate-bounce" : ""
        }`}
        aria-label="Connect With Agent"
      >
        <FaComments className="text-lg" />
        <span>Get Assistance</span>
      </Link>
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 shadow">
        Start your application
      </div>
    </div>
  );
};

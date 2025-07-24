// src/Components/Layout/F
import { Link } from "react-router-dom";

export const FloatingCTA = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Link
        to="/form"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 font-semibold"
      >
        Connect With Agent
      </Link>
    </div>
  );
};

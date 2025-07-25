import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6 py-4 border-t dark:border-gray-700">
      <p>&copy; 2025 FINCLUDE. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-1">
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/privacy" className="hover:underline">Privacy</Link>
        <Link to="/terms" className="hover:underline">Terms</Link>
      </div>
    </footer>
  );
};

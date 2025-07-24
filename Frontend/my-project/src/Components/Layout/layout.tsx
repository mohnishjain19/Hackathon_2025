import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { IoSunny, IoMoon } from "react-icons/io5";
import logo from "../../assets/finclude.jpg";
import { Marquee } from "./Marquee";
import { FeatureCards } from "./FeatureCards";
import { FloatingCTA } from "./FloatingCTA";
import "../../App.css";

export const Layout = () => {
  const location = useLocation();
  const hideFeatures = location.pathname.startsWith("/form") || location.pathname.startsWith("/admin");

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition duration-500">
      {/* Header/Navbar */}
      <header className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700 shadow">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="FinClude Logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-2xl font-bold">
            <Link to="/">FINCLUDE</Link>
          </h1>
          <nav className="ml-6 flex space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/form" className="hover:underline">Form</Link>
            <Link to="/about" className="hover:underline">About</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/admin-authentication" className="hover:underline">Admin Login</Link>
          <button onClick={toggleTheme} className="text-2xl">
            {theme ? <IoSunny /> : <IoMoon />}
          </button>
        </div>
      </header>

      {/* Marquee + Features */}
      {!hideFeatures && (
        <>
          <Marquee />
          <FeatureCards />
        </>
      )}

      {/* Main Content */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>

      {/* CTA Button */}
      {!hideFeatures && <FloatingCTA />}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t dark:border-gray-700">
        <p>&copy; 2025 FINCLUDE. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-1">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
        </div>
      </footer>

    </div>
  );
};

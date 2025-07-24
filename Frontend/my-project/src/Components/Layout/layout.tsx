import  { useEffect, useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition duration-500">
    <div className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
      
      {/* Left: Logo + Links */}
      <div className="flex space-x-6 items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">FINCLUDE</Link>
        </h1>
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/form" className="hover:underline">Form</Link>
      </div>
  
      {/* Right: Admin Login + Theme Toggle */}
      <div className="flex space-x-4 items-center">
        <Link to="/admin-authentication" className="hover:underline">Admin Login</Link>
        <button onClick={toggleTheme} className="text-2xl">
          {theme ? <IoSunny /> : <IoMoon />}
        </button>
      </div>
    </div>
  
    <div className="p-4">
      <Outlet />
    </div>
  </div>
  );
};

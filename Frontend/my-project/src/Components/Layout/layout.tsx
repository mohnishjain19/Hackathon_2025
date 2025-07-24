import React, { useEffect, useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import { Outlet } from "react-router-dom";

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
        <h1 className="text-2xl font-bold">FINCLUDE</h1>
        <button onClick={toggleTheme} className="text-2xl">
          {theme ? <IoSunny /> : <IoMoon />}
        </button>
      </div>

      {/* Outlet renders current route content */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

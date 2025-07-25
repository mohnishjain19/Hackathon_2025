import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { IoSunny, IoMoon } from "react-icons/io5";
import logo from "../../assets/finclude.jpg";
import { Marquee } from "./Marquee";
import { FeatureCards } from "./FeatureCards";
import { FloatingCTA } from "./FloatingCTA";
import { translations } from "../../locales";
import type { LanguageCode } from "../../locales";

import "../../App.css";

export const Layout = () => {

  
  const location = useLocation();
  const hideFeatures =
    location.pathname.startsWith("/form") || location.pathname.startsWith("/admin");

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

  const [lang, setLang] = useState<LanguageCode>("en"); // ✅ type-safe language

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

  const langText = translations[lang]; // ✅ get translations for selected lang

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
            <Link to="/" className="hover:underline">{langText.home}</Link>
            <Link to="/form" className="hover:underline">{langText.form}</Link>
            <Link to="/about" className="hover:underline">{langText.about}</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/admin-authentication" className="hover:underline">{langText.admin}</Link>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as LanguageCode)}
            className="border dark:border-gray-700 rounded px-2 py-1 text-sm"
          >
            <option value="en">🇬🇧 EN</option>
            <option value="hi">🇮🇳 हिन्दी</option>
            <option value="kn">🇮🇳 ಕನ್ನಡ</option>
            <option value="bn">🇮🇳 বাংলা</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="ta">🇮🇳 தமிழ்</option>
            <option value="te">🇮🇳 తెలుగు</option>
          </select>
          <button onClick={toggleTheme} className="text-2xl">
            {theme ? <IoSunny /> : <IoMoon />}
          </button>
        </div>
      </header>

      {/* Marquee + Features */}
      {!hideFeatures && (
        <>
          <Marquee lang={lang} />
          <FeatureCards lang={lang} />
        </>
      )}

      {/* Main Content */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>

      {/* CTA Button */}
      {!hideFeatures && <FloatingCTA lang={lang} />}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t dark:border-gray-700">
        <p>&copy; 2025 FINCLUDE. {langText.copyright}</p>
        <div className="flex justify-center space-x-4 mt-1">
          <Link to="/about" className="hover:underline">{langText.about}</Link>
          <Link to="/privacy" className="hover:underline">{langText.privacy}</Link>
          <Link to="/terms" className="hover:underline">{langText.terms}</Link>
        </div>
      </footer>
    </div>
  );
};

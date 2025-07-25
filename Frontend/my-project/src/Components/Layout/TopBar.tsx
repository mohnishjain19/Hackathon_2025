
import { Link } from "react-router-dom";
import { IoSunny, IoMoon } from "react-icons/io5";
import logo from "../../assets/finclude.jpg";

export const TopBar = ({ theme, toggleTheme }: { theme: boolean; toggleTheme: () => void }) => {
  return (
    <div className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700 shadow">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="FinClude Logo" className="h-10 w-10 rounded-full" />
        <h1 className="text-2xl font-bold">
          <Link to="/">FINCLUDE</Link>
        </h1>
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/form" className="hover:underline">Form</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/admin-authentication" className="hover:underline">Admin Login</Link>
        <button onClick={toggleTheme} className="text-2xl">
          {theme ? <IoSunny /> : <IoMoon />}
        </button>
      </div>
    </div>
  );
};

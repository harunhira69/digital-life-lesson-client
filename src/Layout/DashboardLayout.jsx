import { NavLink, Outlet, Link } from "react-router";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaBook,
  FaUser,
  FaHeart,
  FaSignOutAlt,
  FaHome,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import useAuth from "../hook/useAuth";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const DashboardLayout = () => {
  const { user, handleSignOut } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const linkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-2 rounded-lg bg-primary text-white dark:bg-primary/80"
      : "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col">
        
        <div className="px-6 py-5 text-xl font-bold text-primary dark:text-primary/90">
          Dashboard
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavLink to="/dashboard" end className={linkClass}>
            <FaTachometerAlt /> Overview
          </NavLink>

          <NavLink to="/dashboard/add-lesson" className={linkClass}>
            <FaPlusCircle /> Add Lesson
          </NavLink>

          <NavLink to="/dashboard/my-lessons" className={linkClass}>
            <FaBook /> My Lessons
          </NavLink>

          <NavLink to="/dashboard/my-favorites" className={linkClass}>
            <FaHeart /> My Favorites
          </NavLink>

          <NavLink to="/dashboard/profile" className={linkClass}>
            <FaUser /> Profile
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 text-red-500 px-4 py-2 w-full rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <FaSignOutAlt /> Log out
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 flex items-center justify-between transition-colors">

          <div className="flex items-center gap-4">

            {/* Home */}
            <Link
              to="/"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              title="Go to Home"
            >
              <FaHome />
            </Link>

            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
              Dashboard
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* THEME SWITCH */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {/* User Name */}
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
              {user?.displayName}
            </span>

            {/* Avatar */}
            <img
              src={user?.photoURL || "/avatar.png"}
              alt="User"
              className="w-10 h-10 rounded-full border dark:border-gray-600"
            />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 text-gray-900 dark:text-gray-200">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;

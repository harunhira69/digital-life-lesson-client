import { NavLink, Outlet, Link } from "react-router";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaBook,
  FaUser,
  FaHeart,
  FaSignOutAlt,
  FaHome
} from "react-icons/fa";
import useAuth from "../hook/useAuth";

const DashboardLayout = () => {
  const { user, handleSignOut } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-2 rounded-lg bg-primary text-white"
      : "flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-100";

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="px-6 py-5 text-xl font-bold text-primary">
          Dashboard
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavLink to="/dashboard" end className={linkClass}>
            <FaTachometerAlt />
            Overview
          </NavLink>

          <NavLink to="/dashboard/add-lesson" className={linkClass}>
            <FaPlusCircle />
            Add Lesson
          </NavLink>

          <NavLink to="/dashboard/my-lessons" className={linkClass}>
            <FaBook />
            My Lessons
          </NavLink>

          {/* New: My Favorites */}
          <NavLink to="/dashboard/my-favorites" className={linkClass}>
            <FaHeart />
            My Favorites
          </NavLink>

          <NavLink to="/dashboard/profile" className={linkClass}>
            <FaUser />
            Profile
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 text-red-500 px-4 py-2 w-full rounded-lg hover:bg-red-50"
          >
            <FaSignOutAlt />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Home Button */}
            <Link
              to="/"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 text-gray-700"
              title="Go to Home"
            >
              <FaHome />
            </Link>

            <h1 className="text-lg font-semibold">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:block">
              {user?.displayName}
            </span>
            <img
              src={user?.photoURL || "/avatar.png"}
              alt="User"
              className="w-9 h-9 rounded-full border"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

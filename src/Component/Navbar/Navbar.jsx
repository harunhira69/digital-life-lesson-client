import { Link, NavLink } from "react-router";
import useAuth from "../../hook/useAuth";

const Navbar = () => {
  const { user, handleSignOut } = useAuth();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "text-gray-600 hover:text-primary";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          DigitalLifeLessons
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/public-lessons" className={navLinkClass}>
            Public Lessons
          </NavLink>

          {user && (
            <>
              <NavLink to="/dashboard/add-lesson" className={navLinkClass}>
                Add Lesson
              </NavLink>
              <NavLink to="/dashboard/my-lessons" className={navLinkClass}>
                My Lessons
              </NavLink>
              <NavLink to="/pricing" className={navLinkClass}>
                Upgrade
              </NavLink>
            </>
          )}
        </div>

        {/* Auth Area */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/auth/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/auth/register" className="btn btn-primary btn-sm">
                Signup
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              {/* Avatar */}
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || "/avatar.png"}
                    alt="User Avatar"
                  />
                </div>
              </label>

              {/* Dropdown */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52"
              >
                <li className="font-semibold px-2 cursor-default">
                  {user.displayName || "User"}
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-red-500"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

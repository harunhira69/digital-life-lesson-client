import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../hook/useAuth";
import { ThemeContext } from "../../Context/ThemeContext";

const Navbar = () => {
  const { user, handleSignOut } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = isHome
    ? scrolled
      ? "bg-[#080810]/90 backdrop-blur-xl border-b border-white/8 shadow-lg"
      : "bg-transparent"
    : "bg-white dark:bg-[#0d0d16] border-b border-gray-100 dark:border-white/8 shadow-sm";

  const linkBase = isHome
    ? "text-white/70 hover:text-white transition-colors text-sm font-medium"
    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium";

  const navLinkClass = ({ isActive }) =>
    isActive
      ? (isHome ? "text-amber-400 font-semibold" : "text-blue-600 dark:text-amber-400 font-semibold")
      : linkBase;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">

        <Link to="/" className={`text-xl font-black tracking-tight ${isHome ? "text-white" : "text-gray-900 dark:text-white"}`}>
          Digital<span className="text-amber-400">Life</span>Lessons
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/public-lessons" className={navLinkClass}>Public Lessons</NavLink>
          {user && (
            <>
              <NavLink to="/dashboard/add-lesson" className={navLinkClass}>Add Lesson</NavLink>
              <NavLink to="/dashboard/my-lessons" className={navLinkClass}>My Lessons</NavLink>
              {user.role !== "Premium" && user.role !== "admin" && (
                <NavLink to="/pricing" className={navLinkClass}>Upgrade</NavLink>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className={`p-2 rounded-lg transition-all ${isHome ? "text-white/60 hover:text-white hover:bg-white/10" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"}`}>
            {theme === "light" ? <FaMoon size={16} /> : <FaSun size={16} />}
          </button>

          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/auth/login" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isHome ? "text-white/80 hover:text-white hover:bg-white/10" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"}`}>
                Login
              </Link>
              <Link to="/auth/register" className="px-4 py-2 rounded-lg bg-amber-400 text-black text-sm font-bold hover:bg-amber-300 transition-all hover:scale-105">
                Sign up free
              </Link>
            </div>
          ) : (
            <div className="hidden md:block">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer flex items-center gap-2">
                  <img
                    src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-400/30 hover:ring-amber-400/60 transition-all"
                  />
                  {user.role === "Premium" && <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">Premium ⭐</span>}
                  {user.role === "admin" && <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full border border-red-400/30">Admin</span>}
                </label>
                <ul tabIndex={0} className="dropdown-content menu menu-sm mt-3 p-2 shadow-xl bg-white dark:bg-[#12121f] border border-gray-100 dark:border-white/10 rounded-2xl w-52 text-sm">
                  <li className="px-3 py-2 text-gray-400 text-xs font-medium border-b border-gray-100 dark:border-white/8 mb-1">{user.displayName || "User"}</li>
                  <li><Link to="/dashboard" className="rounded-lg">Dashboard</Link></li>
                  <li><Link to="/dashboard/profile" className="rounded-lg">Profile</Link></li>
                  {user.role === "admin" && <li><Link to="/dashboard/admin/manage-users" className="rounded-lg">Admin panel</Link></li>}
                  <li className="border-t border-gray-100 dark:border-white/8 mt-1 pt-1">
                    <button onClick={handleSignOut} className="w-full text-left rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">Log out</button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-2 rounded-lg ${isHome ? "text-white/70 hover:bg-white/10" : "text-gray-600 dark:text-gray-300"}`}>
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0d0d16]/95 backdrop-blur-xl border-t border-white/8 px-6 py-4 flex flex-col gap-3">
          {[
            { to: "/", label: "Home", end: true },
            { to: "/public-lessons", label: "Public Lessons" },
            ...(user ? [
              { to: "/dashboard/add-lesson", label: "Add Lesson" },
              { to: "/dashboard/my-lessons", label: "My Lessons" },
              { to: "/dashboard", label: "Dashboard" },
              { to: "/dashboard/profile", label: "Profile" },
              ...(user.role !== "Premium" && user.role !== "admin" ? [{ to: "/pricing", label: "Upgrade ⭐" }] : []),
            ] : []),
          ].map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-amber-400 bg-amber-400/10" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
              {label}
            </NavLink>
          ))}
          {!user ? (
            <div className="flex gap-2 pt-2 border-t border-white/10">
              <Link to="/auth/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2 rounded-lg text-white/80 border border-white/15 text-sm">Login</Link>
              <Link to="/auth/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2 rounded-lg bg-amber-400 text-black text-sm font-bold">Sign up</Link>
            </div>
          ) : (
            <button onClick={() => { handleSignOut(); setMenuOpen(false); }} className="mt-2 py-2 rounded-lg text-red-400 border border-red-400/20 text-sm">Log out</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
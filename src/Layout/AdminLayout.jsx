import { Outlet, NavLink } from "react-router";
import useAuth from "../hook/useAuth";


const AdminLayout = () => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <p className="text-center py-20 text-red-500">Access Denied</p>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="/dashboard/admin" className="hover:text-yellow-400">Dashboard</NavLink>
          <NavLink to="/dashboard/admin/manage-users" className="hover:text-yellow-400">Manage Users</NavLink>
          <NavLink to="/dashboard/admin/manage-lessons" className="hover:text-yellow-400">Manage Lessons</NavLink>
          <NavLink to="/dashboard/admin/reported-lessons" className="hover:text-yellow-400">Reported Lessons</NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

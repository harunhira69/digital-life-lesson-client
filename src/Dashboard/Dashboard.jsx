import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import useAuth from "../hook/useAuth";

const DashboardHome = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboard-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard-stats?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (authLoading)
    return (
      <p className="text-center py-20 text-gray-500 dark:text-gray-400">
        Checking authentication...
      </p>
    );

  if (!user)
    return (
      <p className="text-center py-20 text-gray-500 dark:text-gray-400">
        Please log in to view your dashboard.
      </p>
    );

  if (isLoading)
    return (
      <p className="text-center py-20 text-gray-500 dark:text-gray-400">
        Loading dashboard...
      </p>
    );

  return (
    <div className="p-6 lg:p-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Welcome */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-10">
        Welcome back, {user.displayName} 👋
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Lessons */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:scale-105 transform transition duration-300">
          <div>
            <p className="text-sm opacity-80">Total Lessons</p>
            <h3 className="text-4xl font-bold mt-2">{stats.totalLessons || 0}</h3>
          </div>
          <div className="mt-4 text-right text-opacity-70 text-3xl">
            📚
          </div>
        </div>

        {/* Public Lessons */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:scale-105 transform transition duration-300">
          <div>
            <p className="text-sm opacity-80">Public Lessons</p>
            <h3 className="text-4xl font-bold mt-2">{stats.publicLessons || 0}</h3>
          </div>
          <div className="mt-4 text-right text-opacity-70 text-3xl">
            🌟
          </div>
        </div>

        {/* Favorites */}
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:scale-105 transform transition duration-300">
          <div>
            <p className="text-sm opacity-80">Favorites</p>
            <h3 className="text-4xl font-bold mt-2">{stats.favorites || 0}</h3>
          </div>
          <div className="mt-4 text-right text-opacity-70 text-3xl">
            ❤️
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <button className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 text-xl font-semibold flex items-center justify-center gap-2">
          ➕ Add New Lesson
        </button>
        <button className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 text-xl font-semibold flex items-center justify-center gap-2">
          📖 View My Lessons
        </button>
        <button className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 text-xl font-semibold flex items-center justify-center gap-2">
          ❤️ My Favorites
        </button>
        <button className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 text-xl font-semibold flex items-center justify-center gap-2">
          ⚙️ Settings
        </button>
      </div> */}
    </div>
  );
};

export default DashboardHome;

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      
      <h2 className="text-2xl font-semibold">
        Welcome back 👋
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Total Lessons</p>
          <h3 className="text-3xl font-bold">12</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Public Lessons</p>
          <h3 className="text-3xl font-bold">7</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Favorites</p>
          <h3 className="text-3xl font-bold">5</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

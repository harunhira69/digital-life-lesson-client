import { useState, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const Profile = () => {
  const { user, updateUserProfile, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  // sync local state when user becomes available
  useEffect(() => {
    setName(user?.displayName || "");
    setPhoto(user?.photoURL || "");
  }, [user]);

  // 🔹 Fetch profile stats
  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["profile-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard-stats?email=${user.email}`);
      return {
        created: res.data.totalLessons,
        saved: res.data.favorites,
      };
    },
  });

  // 🔹 Fetch user's public lessons
  const { data: lessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ["my-public-lessons", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-lessons/${user.email}`);
      return res.data.filter((lesson) => lesson.visibility === "Public"); // শুধু public lessons
    },
  });

  // 🔹 Update profile mutation
  const updateMutation = useMutation({
    mutationFn: async () => {
      // firebase updateProfile expects an object { displayName, photoURL }
      return updateUserProfile({ displayName: name, photoURL: photo });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries(["profile-stats", user?.email]);
    },
  });

  if (authLoading) return <p className="text-center py-20">Checking authentication...</p>;
  if (!user) return <p className="text-center py-20">Please log in to view your profile.</p>;

  if (statsLoading)
    return (
      <p className="text-center py-20 text-gray-500 dark:text-gray-400">
        Loading profile stats...
      </p>
    );

  return (
    <div className="p-6 lg:p-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <Toaster />
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
        My Profile
      </h2>

      {/* ===== PROFILE CARD ===== */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6 mb-12 transition-colors">
        <img
          src={photo || "https://via.placeholder.com/120"}
          className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-blue-500 object-cover"
          alt="Profile"
        />

        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            {user?.displayName}
            {user?.role === "Premium" && (
              <span className="ml-2 px-2 py-1 text-yellow-500 text-sm font-semibold bg-yellow-100 dark:bg-yellow-600 rounded-full">
                ⭐ Premium
              </span>
            )}
          </h3>

          <p className="text-gray-500 dark:text-gray-300 mt-2">{user.email}</p>

          <div className="flex flex-wrap gap-6 mt-5 text-gray-700 dark:text-gray-200">
            <div className="bg-blue-100 dark:bg-blue-700 px-4 py-2 rounded-lg shadow-sm">
              Lessons Created: <strong>{stats.created || 0}</strong>
            </div>
            <div className="bg-green-100 dark:bg-green-700 px-4 py-2 rounded-lg shadow-sm">
              Lessons Saved: <strong>{stats.saved || 0}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ===== UPDATE PROFILE FORM ===== */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-12 transition-colors">
        <h4 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Update Profile
        </h4>

        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
            placeholder="Display Name"
          />

          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
            placeholder="Photo URL"
          />

          <button
            onClick={() => updateMutation.mutate()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
            disabled={updateMutation.isLoading}
          >
            {updateMutation.isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>

      {/* ===== USER LESSONS GRID ===== */}
      <h3 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        My Public Lessons
      </h3>

      {lessonsLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading lessons...
        </p>
      ) : lessons.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
          You have not created any lessons yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">
                {lesson.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {lesson.description.slice(0, 100)}...
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white rounded-full">
                  {lesson.category}
                </span>
                <span className="px-3 py-1 text-xs font-semibold bg-green-100 dark:bg-green-700 text-green-700 dark:text-white rounded-full">
                  {lesson.emotionalTone}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

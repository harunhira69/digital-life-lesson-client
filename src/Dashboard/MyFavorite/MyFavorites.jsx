import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import useAuth from "../../hook/useAuth";
import useAxiosSecue from "../../hook/useAxiosSecure";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecue();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [tone, setTone] = useState("All");

  // 🔹 Fetch favorites
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["my-favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user.email}`);
      return res.data;
    },
  });

  // 🔹 Remove favorite mutation
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/favorites/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-favorites", user.email]);
    },
  });

  // 🔹 Handle remove with Swal
  const handleRemove = (id, title) => {
    Swal.fire({
      title: `Remove "${title}"?`,
      text: "This lesson will be removed from your favorites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Removed!",
              text: `"${title}" has been removed from favorites.`,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          },
          onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to remove favorite");
          },
        });
      }
    });
  };

  // 🔹 Dynamic filters
  const categories = ["All", ...new Set(favorites.map(f => f.category))];
  const tones = ["All", ...new Set(favorites.map(f => f.emotionalTone))];

  const filteredFavorites = favorites.filter((item) => {
    const matchCategory = category === "All" || item.category === category;
    const matchTone = tone === "All" || item.emotionalTone === tone;
    return matchCategory && matchTone;
  });

  if (isLoading)
    return (
      <p className="text-center py-20 text-xl text-gray-500 dark:text-gray-300">
        Loading favorites...
      </p>
    );

  return (
    <div className="px-6 lg:px-20 py-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
        My Favorite Lessons
      </h2>

      {/* ===== FILTER BAR ===== */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/4 shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/4 shadow-sm focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
        >
          {tones.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* ===== FAVORITES TABLE ===== */}
      {filteredFavorites.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
          No favorite lessons found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <thead className="bg-blue-100 dark:bg-blue-900 text-gray-700 dark:text-gray-200 uppercase text-sm font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Tone</th>
                <th className="px-6 py-3 text-left">Access</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFavorites.map((fav) => (
                <tr
                  key={fav._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                    {fav.title}
                  </td>
                  <td className="px-6 py-4">{fav.category}</td>
                  <td className="px-6 py-4">{fav.emotionalTone}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        fav.accessLevel === "Premium" ? "bg-yellow-500" : "bg-green-500"
                      }`}
                    >
                      {fav.accessLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/life-lesson/${fav.lessonId}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleRemove(fav._id, fav.title)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFavorites;

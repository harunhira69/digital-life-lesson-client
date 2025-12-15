import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";

import useAuth from "../../hook/useAuth";
import useAxiosSecue from "../../hook/useAxiosSecure";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecue();
  const { user } = useAuth();
  const navigate = useNavigate();

  /* ================= FILTER STATE ================= */
  const [category, setCategory] = useState("All");
  const [accessLevel, setAccessLevel] = useState("All");
  const [search, setSearch] = useState("");

  /* ================= FAVORITE STATE ================= */
  const [favoriteIds, setFavoriteIds] = useState([]);

  /* ================= FETCH PUBLIC LESSONS ================= */
  const {
    data: lessons = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["public-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/public-lessons");
      return res.data;
    },
  });

  /* ================= FETCH USER FAVORITES ================= */
useEffect(() => {
  if (!user?.email) return;

  axiosSecure
    .get(`/favorites?email=${user.email}`) // ✅ query param
    .then((res) => {
      const ids = res.data.map((f) => String(f.lessonId));
      setFavoriteIds(ids);
    })
    .catch(() => {});
}, [user, axiosSecure]);


  /* ================= FILTER LOGIC ================= */
  const categories = ["All", ...new Set(lessons.map((l) => l.category))];

  const filteredLessons = lessons.filter((lesson) => {
    const matchCategory =
      category === "All" || lesson.category === category;
    const matchAccess =
      accessLevel === "All" || lesson.accessLevel === accessLevel;
    const matchSearch =
      lesson.title.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchAccess && matchSearch;
  });

  /* ================= HANDLERS ================= */
  const handleCardClick = (lesson) => {
    const locked =
      lesson.accessLevel === "Premium" && user?.role !== "Premium";

    if (locked) navigate("/pricing");
    else navigate(`/life-lesson/${lesson._id}`);
  };

const handleFavorite = async (lessonId, e) => {
  e.stopPropagation(); // prevent card click

  if (!user) {
    toast.error("Please login first");
    return;
  }

  try {
    await axiosSecure.post("/favorites", {
      lessonId,
      userEmail: user.email,
    });

    // store as string to match fetched ids
    setFavoriteIds((prev) => [...prev, String(lessonId)]);
    toast.success("Added to favorites ❤️");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to add favorite");
  }
};


  /* ================= UI STATES ================= */
  if (isLoading)
    return <p className="text-center py-10">Loading lessons...</p>;

  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load lessons
      </p>
    );

  /* ================= UI ================= */
  return (
    <div className="px-6 lg:px-20 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">
        Browse Public Life Lessons
      </h1>

      {/* ===== FILTER BAR ===== */}
      <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search lesson title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/4"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={accessLevel}
          onChange={(e) => setAccessLevel(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/4"
        >
          <option value="All">All Access</option>
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>
      </div>

      {/* ===== LESSON CARDS ===== */}
      {filteredLessons.length === 0 ? (
        <p className="text-center text-gray-500">
          No lessons match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLessons.map((lesson) => {
            const isLocked =
              lesson.accessLevel === "Premium" &&
              user?.role !== "Premium";

            const isFavorited = favoriteIds.includes(String(lesson._id));

            return (
              <div
                key={lesson._id}
                onClick={() => handleCardClick(lesson)}
                className="relative bg-white shadow-md rounded-lg p-5 cursor-pointer hover:shadow-lg transition"
              >
                {/* ❤️ Favorite */}
                <button
                  onClick={(e) => handleFavorite(lesson._id, e)}
                  className="absolute top-3 right-3 z-20"
                >
                  {isFavorited ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-400 text-xl hover:text-red-400" />
                  )}
                </button>

                {/* 🔒 Premium Overlay */}
                {isLocked && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                    <span className="text-3xl">🔒</span>
                    <p className="font-semibold mt-2 text-center">
                      Premium Lesson – Upgrade to view
                    </p>
                  </div>
                )}

                {/* Creator */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={
                      lesson.creatorPhotoUrl ||
                      "https://via.placeholder.com/50"
                    }
                    alt="creator"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{lesson.creatorName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(
                        lesson.createdDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <h2 className="text-xl font-bold mb-2">
                  {lesson.title}
                </h2>

                <p className="text-gray-600 mb-3">
                  {lesson.description.substring(0, 80)}...
                </p>

                {/* Meta */}
                <div className="flex justify-between items-center text-sm">
                  <span className="bg-gray-200 px-2 py-1 rounded">
                    {lesson.category}
                  </span>
                  <span className="bg-blue-200 px-2 py-1 rounded">
                    {lesson.emotionalTone}
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      lesson.accessLevel === "Premium"
                        ? "bg-yellow-300"
                        : "bg-green-300"
                    }`}
                  >
                    {lesson.accessLevel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PublicLessons;

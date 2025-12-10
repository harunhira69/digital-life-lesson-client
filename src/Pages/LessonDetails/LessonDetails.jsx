import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecue from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const LessonDetails = () => {
  const axiosSecure = useAxiosSecue();
  const { user } = useAuth(); // contains role info
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/lesson/${id}`)
      .then((res) => {
        setLesson(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  if (loading) return <p className="text-center mt-20">Loading lesson...</p>;
  if (!lesson) return <p className="text-center mt-20">Lesson not found</p>;

  // Determine if lesson is locked
  const isPremiumLocked = lesson.accessLevel === "Premium" && user?.role !== "Premium";

  return (
    <div className="px-6 lg:px-32 py-12 bg-gray-50 min-h-screen">
      <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">

        {/* 🔒 Blurred overlay if locked */}
        {isPremiumLocked && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-xl">
            <span className="text-5xl mb-4">🔒</span>
            <p className="text-lg font-semibold mb-6 text-center">
              This is a Premium Lesson.
              <br />
              Upgrade to view full content.
            </p>
            <button
              onClick={() => navigate("/pricing")}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Go to Pricing
            </button>
          </div>
        )}

        {/* Creator Info */}
        <div className={`flex items-center gap-4 mb-6 ${isPremiumLocked ? "opacity-50" : ""}`}>
          <img
            src={lesson.creatorPhotoUrl}
            alt="creator"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{lesson.creatorName}</h3>
            <p className="text-sm text-gray-500">
              {new Date(lesson.createdDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Title */}
        <h1 className={`text-3xl font-bold mb-4 ${isPremiumLocked ? "opacity-50" : ""}`}>
          {lesson.title}
        </h1>

        {/* Meta */}
        <div className={`flex flex-wrap gap-3 text-sm mb-6 ${isPremiumLocked ? "opacity-50" : ""}`}>
          <span className="bg-gray-200 px-3 py-1 rounded">{lesson.category}</span>
          <span className="bg-blue-200 px-3 py-1 rounded">{lesson.emotionalTone}</span>
          <span className={`px-3 py-1 rounded ${lesson.accessLevel === "Premium" ? "bg-yellow-300" : "bg-green-300"}`}>
            {lesson.accessLevel}
          </span>
          <span className="bg-purple-200 px-3 py-1 rounded">👀 {lesson.viewsCount || 0} Views</span>
        </div>

        {/* Content */}
        <p className={`text-gray-700 leading-relaxed whitespace-pre-line ${isPremiumLocked ? "opacity-50 select-none" : ""}`}>
          {lesson.description}
        </p>
      </div>
    </div>
  );
};

export default LessonDetails;

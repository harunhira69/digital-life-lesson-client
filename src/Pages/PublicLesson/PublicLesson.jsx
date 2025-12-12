import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecue from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PublicLessons = () => {
  const axiosSecure = useAxiosSecue();
  const { user } = useAuth();
  const navigate = useNavigate();

const { data: lessons = [], isLoading, error } = useQuery({
  queryKey: ["public-lessons"],
  queryFn: async () => {
    const res = await axiosSecure.get("/public-lessons");
    return res.data;
  },
});


  const handleCardClick = (lesson) => {
    const isPremiumLocked = lesson.accessLevel === "Premium" && user?.role !== "Premium";
    if (isPremiumLocked) {
      navigate("/pricing");
    } else {
      navigate(`/life-lesson/${lesson._id}`);
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading lessons...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error loading lessons</p>;
  if (lessons.length === 0) return <p className="text-center py-10 text-gray-500">No public lessons found.</p>;

  return (
    <div className="px-6 lg:px-20 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">
        Browse Public Life Lessons
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map((lesson) => {
          const isPremiumLocked = lesson.accessLevel === "Premium" && user?.role !== "Premium";
          return (
            <div
              key={lesson._id}
              className="bg-white shadow-md rounded-lg overflow-hidden p-5 relative cursor-pointer"
              onClick={() => handleCardClick(lesson)}
            >
              {isPremiumLocked && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                  <span className="text-3xl">🔒</span>
                  <p className="font-semibold mt-2 text-center">
                    Premium Lesson – Upgrade to view
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={lesson.creatorPhotoUrl || "https://via.placeholder.com/50"}
                  alt="creator"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{lesson.creatorName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(lesson.createdDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
              <p className="text-gray-600 mb-3">
                {lesson.description.substring(0, 80)}...
              </p>

              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="bg-gray-200 px-2 py-1 rounded">{lesson.category}</span>
                <span className="bg-blue-200 px-2 py-1 rounded">{lesson.emotionalTone}</span>
                <span className={`px-2 py-1 rounded ${lesson.accessLevel === "Premium" ? "bg-yellow-300" : "bg-green-300"}`}>
                  {lesson.accessLevel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicLessons;

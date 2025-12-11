import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


import { useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import useAxiosSecue from "../../hook/useAxiosSecure";

const AddLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecue();
  const navigate = useNavigate();

  const initialState = {
    title: "",
    description: "",
    category: "",
    emotionalTone: "",
    imageUrl: "",
    privacy: "Public",
    accessLevel: "Free",
  };

  const [lessonData, setLessonData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData({ ...lessonData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...lessonData, email: user.email };
      const res = await axiosSecure.post("/lessons", payload);

      if (res.data?.insertedId) {
        toast.success("Lesson added successfully!");
        setLessonData(initialState);
        navigate("/public-lessons"); // redirect to Public Lessons page
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add lesson");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Toaster />
      <h3 className="text-4xl font-bold mb-6">Add Lesson</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Lesson Title</label>
          <input
            type="text"
            name="title"
            value={lessonData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label>Full Description / Story / Insight</label>
          <textarea
            name="description"
            value={lessonData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={5}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={lessonData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes Learned">Mistakes Learned</option>
          </select>
        </div>

        <div>
          <label>Emotional Tone</label>
          <select
            name="emotionalTone"
            value={lessonData.emotionalTone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Emotional Tone</option>
            <option value="Motivational">Motivational</option>
            <option value="Sad">Sad</option>
            <option value="Realization">Realization</option>
            <option value="Gratitude">Gratitude</option>
          </select>
        </div>

        <div>
          <label>Image URL (Optional)</label>
          <input
            type="text"
            name="imageUrl"
            value={lessonData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Privacy</label>
          <select
            name="privacy"
            value={lessonData.privacy}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div>
          <label>Access Level</label>
          <select
            name="accessLevel"
            value={lessonData.accessLevel}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            disabled={user.role !== "Premium"}
            title={user.role !== "Premium" ? "Upgrade to Premium to create paid lessons" : ""}
            required
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;

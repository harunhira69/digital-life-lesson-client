import React, { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecue from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";

const UpdateLesson= ({ lesson, onClose, onUpdated }) => {
  const axiosSecure = useAxiosSecue();
  const { user } = useAuth();

  // Local form state
  const [form, setForm] = useState({
    title: lesson.title,
    description: lesson.description,
    category: lesson.category,
    emotionalTone: lesson.emotionalTone,
    imageUrl: lesson.imageUrl || "",
    visibility: lesson.visibility,
    accessLevel: lesson.accessLevel,
  });

  // Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...form, userRole: user.role };

      await axiosSecure.patch(`/lessons/${lesson._id}`, payload);
      toast.success("Lesson updated successfully!");

      onUpdated({ ...lesson, ...form }); // update parent
      onClose(); // close modal
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 w-96 p-6 rounded-xl shadow-lg transition-all">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Update Lesson</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Title */}
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
            placeholder="Title"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
            rows={4}
            placeholder="Description"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
          >
            <option>Personal Growth</option>
            <option>Career</option>
            <option>Relationships</option>
            <option>Mindset</option>
            <option>Mistakes Learned</option>
          </select>

          {/* Tone */}
          <select
            name="emotionalTone"
            value={form.emotionalTone}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
          >
            <option>Motivational</option>
            <option>Sad</option>
            <option>Realization</option>
            <option>Gratitude</option>
          </select>

          {/* Image URL */}
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
          />

          {/* Visibility */}
          <select
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          {/* Access Level */}
          <select
            name="accessLevel"
            value={form.accessLevel}
            onChange={handleChange}
            disabled={user.role !== "Premium"}
            className={`w-full border p-2 rounded dark:bg-gray-700 dark:text-white ${
              user.role !== "Premium" ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLesson;

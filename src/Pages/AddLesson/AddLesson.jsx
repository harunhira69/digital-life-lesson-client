import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import useAuth from "../../hook/useAuth";
import useAxiosSecue from "../../hook/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecue();
  const queryClient = useQueryClient();

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

  // ✅ React Query Mutation
  const addLessonMutation = useMutation({
    mutationFn: async (newLesson) => {
      const res = await axiosSecure.post("/lessons", newLesson);
      console.log("create lesson response:", res.data);
      return res.data.lesson ?? res.data; // Return server lesson object or entire response
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["public-lessons"] });
    },
    onSuccess: (createdLesson) => {
      queryClient.setQueryData(["public-lessons"], (old = []) => [...old, createdLesson]);
      toast.success("Lesson added successfully!");
      setLessonData(initialState);
    },
    onError: () => {
      toast.error("Failed to add lesson");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...lessonData, email: user.email };
    addLessonMutation.mutate(payload);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 mt-6">
      <Toaster position="top-right" />
      <h3 className="text-4xl font-extrabold text-center mb-8 text-gray-800 dark:text-gray-100">
        Add New Lesson
      </h3>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Lesson Title</label>
          <input
            type="text"
            name="title"
            value={lessonData.title}
            onChange={handleChange}
            placeholder="Enter lesson title"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Full Description</label>
          <textarea
            name="description"
            value={lessonData.description}
            onChange={handleChange}
            placeholder="Enter full description"
            rows={6}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200 resize-none"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Category</label>
            <select
              name="category"
              value={lessonData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
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

          {/* Emotional Tone */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Emotional Tone</label>
            <select
              name="emotionalTone"
              value={lessonData.emotionalTone}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
              required
            >
              <option value="">Select Emotional Tone</option>
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Image URL (Optional)</label>
          <input
            type="text"
            name="imageUrl"
            value={lessonData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Privacy */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Privacy</label>
            <select
              name="privacy"
              value={lessonData.privacy}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
              required
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Access Level */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Access Level</label>
            <select
              name="accessLevel"
              value={lessonData.accessLevel}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
              disabled={user.role !== "Premium"}
              title={user.role !== "Premium" ? "Upgrade to Premium to create paid lessons" : ""}
              required
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition duration-200 text-lg"
          disabled={addLessonMutation.isLoading}
        >
          {addLessonMutation.isLoading ? "Creating..." : "Create Lesson"}
        </button>
      </form>
    </div>
  );
};

export default AddLesson;

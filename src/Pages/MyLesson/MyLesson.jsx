import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import useAxiosSecue from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";


const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecue();
  const [lessons, setLessons] = useState([]);
  const [editingLesson, setEditingLesson] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-lessons/${user.email}`)
        .then(res => setLessons(res.data))
        .catch(err => console.error(err));
    }
  }, [user, axiosSecure]);

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this lesson permanently?")) return;
    try {
      await axiosSecure.delete(`/lessons/${id}`);
      setLessons(prev => prev.filter(l => l._id !== id));
      toast.success("Lesson deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete lesson");
    }
  };

  const handleUpdate = lesson => setEditingLesson(lesson);

  const submitUpdate = async e => {
    e.preventDefault();
    try {
      const { _id, ...updates } = editingLesson;
      const payload = { ...updates, userRole: user.role };
      await axiosSecure.patch(`/lessons/${_id}`, payload);
      setLessons(prev => prev.map(l => (l._id === _id ? editingLesson : l)));
      toast.success("Lesson updated successfully!");
      setEditingLesson(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update lesson");
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEditingLesson({ ...editingLesson, [name]: value });
  };

  return (
    <div className="px-6 lg:px-20 py-12 min-h-screen">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">My Lessons</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Tone</th>
              <th className="px-4 py-2">Privacy</th>
              <th className="px-4 py-2">Access</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map(lesson => (
              <tr key={lesson._id} className="border-b">
                <td className="px-4 py-2">{lesson.title}</td>
                <td className="px-4 py-2">{lesson.category}</td>
                <td className="px-4 py-2">{lesson.emotionalTone}</td>
                <td className="px-4 py-2">{lesson.visibility}</td>
                <td className="px-4 py-2">{lesson.accessLevel}</td>
                <td className="px-4 py-2">{new Date(lesson.createdDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleUpdate(lesson)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editingLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Update Lesson</h2>
            <form onSubmit={submitUpdate} className="space-y-3">
              <input
                type="text"
                name="title"
                value={editingLesson.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="description"
                value={editingLesson.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows={4}
                required
              />
              <select
                name="category"
                value={editingLesson.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="Personal Growth">Personal Growth</option>
                <option value="Career">Career</option>
                <option value="Relationships">Relationships</option>
                <option value="Mindset">Mindset</option>
                <option value="Mistakes Learned">Mistakes Learned</option>
              </select>
              <select
                name="emotionalTone"
                value={editingLesson.emotionalTone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="Motivational">Motivational</option>
                <option value="Sad">Sad</option>
                <option value="Realization">Realization</option>
                <option value="Gratitude">Gratitude</option>
              </select>
              <input
                type="text"
                name="imageUrl"
                value={editingLesson.imageUrl || ""}
                onChange={handleChange}
                placeholder="Image URL (optional)"
                className="w-full border p-2 rounded"
              />
              <select
                name="privacy"
                value={editingLesson.privacy}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
              <select
                name="accessLevel"
                value={editingLesson.accessLevel}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                disabled={user.role !== "Premium"}
                title={user.role !== "Premium" ? "Upgrade to Premium to select Premium" : ""}
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-1 rounded"
                  onClick={() => setEditingLesson(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLessons;

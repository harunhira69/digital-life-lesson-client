import React from "react";
import DeleteLesson from "./DeleteLesson";
import { FaEdit } from "react-icons/fa";

const LessonTable = ({ lessons, onEdit, onDeleted }) => {
    console.log(lessons)
  if (!lessons.length) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No lessons found. Add some lessons to see them here.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
             <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Image
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Category
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {lessons.map((lesson) => (
            <tr
              key={lesson._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            >
                <td className="px-6 py-4">
  {lesson.imageUrl ? (
    <img
      src={lesson.imageUrl}
      alt={lesson.title}
      className="w-16 h-16 object-cover rounded"
    />
  ) : (
    <span className="text-gray-400 dark:text-gray-500">No Image</span>
  )}
</td>

              <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                {lesson.title}
              </td>
              <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                {lesson.category}
              </td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  onClick={() => onEdit(lesson)}
                  className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  <FaEdit /> Edit
                </button>
                <DeleteLesson id={lesson._id} onDeleted={onDeleted} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LessonTable;

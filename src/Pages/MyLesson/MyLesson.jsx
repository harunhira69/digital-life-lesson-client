import React, { useEffect, useState } from "react";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";

import LessonTable from "./LessonTable";
import UpdateLesson from "./UpdateLesson";

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [lessons, setLessons] = useState([]);
  const [editLesson, setEditLesson] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/my-lessons/${user.email}`).then((res) => {
        setLessons(res.data);
      });
    }
  }, [axiosSecure, user]);

  return (
    <div className="px-6 lg:px-20 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">My Lessons</h1>

      <LessonTable
        lessons={lessons}
        onEdit={setEditLesson}
        onDeleted={(id) =>
          setLessons((prev) => prev.filter((l) => l._id !== id))
        }
      />

      {/* Edit Modal */}
      {editLesson && (
        <UpdateLesson
          lesson={editLesson}
          onClose={() => setEditLesson(null)}
          onUpdated={(updated) =>
            setLessons((prev) =>
              prev.map((l) => (l._id === updated._id ? updated : l))
            )
          }
        />
      )}
    </div>
  );
};

export default MyLessons;

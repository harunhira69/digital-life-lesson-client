import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { FaTrash } from "react-icons/fa";

const DeleteLesson = ({ id, onDeleted }) => {
  const axiosSecure = useAxiosSecure();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/lessons/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your lesson has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        onDeleted(id); // Update parent
      } catch (error) {
        Swal.fire({
          title: "Failed!",
          text: error.response?.data?.message || "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      }
    }
  };

  return (
   <button
  onClick={handleDelete}
  className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
>
  <FaTrash /> Delete
</button>
  );
};

export default DeleteLesson;

import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      
      {/* Icon */}
      <FaExclamationTriangle className="text-6xl text-yellow-500 mb-6" />

      {/* Heading */}
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
        404
      </h1>

      {/* Subheading */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-500 text-center mb-6 max-w-md">
        Sorry, the page you are looking for does not exist. It might have been removed or the URL is incorrect.
      </p>

      {/* Back Home Button */}
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

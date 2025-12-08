const LoadingSpinner = ({
  size = "md",
  fullScreen = false,
  text = "Loading..."
}) => {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4"
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "fixed inset-0 bg-white z-50" : ""
      }`}
      aria-busy="true"
      aria-live="polite"
    >
      {/* Spinner */}
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full
          border-gray-300
          border-t-primary
          animate-spin
        `}
      />

      {/* Optional Text */}
      {text && (
        <p className="text-sm text-gray-500">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

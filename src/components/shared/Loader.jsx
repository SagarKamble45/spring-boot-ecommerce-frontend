
const Loader = ({
  text = "Loading...",
  description = "Please wait while we prepare everything for you.",
  color = "border-blue-600",
  fullScreen = false,
  size = "h-12 w-12",
}) => {
  return (
    <div
      className={`flex w-full items-center justify-center ${
        fullScreen
          ? "fixed inset-0 z-[100] min-h-screen bg-white/90 backdrop-blur-sm"
          : "min-h-[300px] px-4"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`${size} animate-spin rounded-full border-[3px] ${color} border-t-transparent`}
        />

        <h3 className="mt-5 text-base font-semibold text-slate-800">
          {text}
        </h3>

        {description && (
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;

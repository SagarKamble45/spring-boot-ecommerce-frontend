import { RotatingLines } from "react-loader-spinner";

const Loader = ({
  text,
  color = "#2563eb",
  fullScreen = false,
}) => {
  return (
    <div
      className={`
        flex items-center justify-center
        ${fullScreen ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50" : "w-full min-h-[300px]"}
      `}
    >
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="p-4">
          <RotatingLines
            visible
            height="70"
            width="70"
            color={color}
            strokeWidth="4"
            animationDuration="0.75"
            ariaLabel="loading-spinner"
          />
        </div>

        <div className="text-center">
          <p className="text-gray-800 font-medium">{text}</p>
          <p className="text-sm text-gray-500 mt-1">
            Please wait while we process your request
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
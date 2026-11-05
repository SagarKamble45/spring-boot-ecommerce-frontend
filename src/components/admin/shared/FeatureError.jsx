
import { AlertCircle, RefreshCw } from "lucide-react";

const FeatureError = ({
  title = "Unable to load data",
  message = "Something went wrong. Please try again.",
  onRetry,
  compact = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-center ${
        compact ? "px-4 py-6" : "px-6 py-10"
      }`}
      role="alert"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
        <AlertCircle size={23} className="text-rose-600" />
      </div>

      <h3 className="mt-3 text-sm font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-1 max-w-md text-sm text-slate-600">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm ring-1 ring-rose-200 transition hover:bg-rose-100"
        >
          <RefreshCw size={15} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default FeatureError;

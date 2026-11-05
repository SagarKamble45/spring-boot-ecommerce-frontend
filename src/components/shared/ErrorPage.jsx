
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Home,
  RefreshCw,
} from "lucide-react";

const ErrorPage = ({
  statusCode,
  title = "Something went wrong",
  errorMessage = "We couldn't complete your request. Please try again.",
  onRetry,
  showRetry = Boolean(onRetry),
  showHomeButton = true,
  homePath = "/",
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50">
          <AlertTriangle className="h-8 w-8 text-rose-500" />
        </div>

        {statusCode && (
          <p className="mt-6 text-sm font-bold tracking-widest text-blue-600">
            ERROR {statusCode}
          </p>
        )}

        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          {title}
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
          {errorMessage}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {showRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          )}

          {showHomeButton && (
            <button
              type="button"
              onClick={() => navigate(homePath)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Home size={16} />
              Back to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

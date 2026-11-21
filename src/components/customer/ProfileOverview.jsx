
import { FaUserCircle, FaEnvelope, FaUserTag, FaShieldAlt } from "react-icons/fa";

function ProfileOverview({ user }) {
  const username = user?.username || "Customer";
  const initial = username.charAt(0).toUpperCase();

  const roles = user?.roles || [];

  const accountRole = roles
    .map((role) => role.replace("ROLE_", ""))
    .join(", ");

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        {/* Avatar */}
        <div
          className="
            h-20 w-20 shrink-0
            rounded-2xl
            bg-gradient-to-br from-blue-500 to-indigo-600
            flex items-center justify-center
            text-white text-3xl font-bold
            shadow-lg shadow-blue-500/20
          "
        >
          {initial}
        </div>

        {/* Basic Information */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-slate-900">
            {username}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Your account overview
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {accountRole && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                <FaUserTag />
                {accountRole}
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
              <FaShieldAlt />
              Signed in
            </span>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <FaUserCircle />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-slate-400">Username</p>
            <p className="text-sm font-semibold text-slate-700 truncate">
              {username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <FaEnvelope />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-slate-400">Email Address</p>
            <p className="text-sm font-semibold text-slate-700 truncate">
              {user?.email || "Not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOverview;


import { FaUserEdit } from "react-icons/fa";

function ProfileHeader({ user, onEditProfile }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and account settings.
        </p>

        <p className="mt-2 text-sm text-slate-600">
          Welcome back,{" "}
          <span className="font-semibold text-slate-800">
            {user?.username || "Customer"}
          </span>
          !
        </p>
      </div>

      <button
        type="button"
        onClick={onEditProfile}
        className="
          inline-flex items-center justify-center gap-2
          px-5 py-2.5
          rounded-xl
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white text-sm font-semibold
          shadow-md shadow-blue-500/20
          hover:shadow-lg hover:scale-[1.02]
          transition-all duration-200
        "
      >
        <FaUserEdit />
        Edit Profile
      </button>
    </div>
  );
}

export default ProfileHeader;

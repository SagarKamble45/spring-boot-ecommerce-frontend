
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaVenusMars,
} from "react-icons/fa";

function PersonalInformation({ user }) {
  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "Not available";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatGender = (gender) => {
    if (!gender) return "Not specified";

    const labels = {
      MALE: "Male",
      FEMALE: "Female",
      OTHER: "Other",
      PREFER_NOT_TO_SAY: "Prefer not to say",
    };

    return labels[gender] || gender;
  };

  const details = [
    {
      label: "Username",
      value: user?.username,
      icon: FaUser,
    },
    {
      label: "Email Address",
      value: user?.email,
      icon: FaEnvelope,
    },
    {
      label: "Phone Number",
      value: user?.phone,
      icon: FaPhone,
    },
    {
      label: "Gender",
      value: formatGender(user?.gender),
      icon: FaVenusMars,
    },
    {
      label: "Member Since",
      value: formatDate(user?.createdAt),
      icon: FaCalendarAlt,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Your personal and contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-400">{item.label}</p>
                <p className="truncate text-sm font-semibold text-slate-700">
                  {item.value || "Not available"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PersonalInformation;

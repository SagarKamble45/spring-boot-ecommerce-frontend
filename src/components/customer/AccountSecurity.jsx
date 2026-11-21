
import {
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaKey,
} from "react-icons/fa";

function AccountSecurity({ onChangePassword }) {
  const securityItems = [
    {
      label: "Account Protection",
      value: "Protected",
      icon: FaShieldAlt,
    },
    {
      label: "Password",
      value: "Password protected",
      icon: FaLock,
    },
    {
      label: "Login Status",
      value: "Currently signed in",
      icon: FaCheckCircle,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Account Security
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your account protection.
          </p>
        </div>

        <div className="h-11 w-11 shrink-0 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-lg">
          <FaShieldAlt />
        </div>
      </div>

      <div className="space-y-5">
        {securityItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className="text-slate-400 shrink-0" />

                <span className="text-sm text-slate-600">
                  {item.label}
                </span>
              </div>

              <span className="text-xs font-semibold text-green-600 text-right">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-100 mt-6 pt-5">
        <button
          type="button"
          onClick={onChangePassword}
          className="
            w-full inline-flex items-center justify-center gap-2
            rounded-xl border border-slate-200
            px-4 py-2.5
            text-sm font-semibold text-slate-700
            hover:bg-slate-50 transition-colors
          "
        >
          <FaKey />
          Change Password
        </button>
      </div>
    </div>
  );
}

export default AccountSecurity;


const COLOR_STYLES = {
  blue: {
    container: "border-blue-100 bg-blue-50/40",
    icon: "bg-blue-100 text-blue-600",
  },
  green: {
    container: "border-emerald-100 bg-emerald-50/40",
    icon: "bg-emerald-100 text-emerald-600",
  },
  red: {
    container: "border-rose-100 bg-rose-50/40",
    icon: "bg-rose-100 text-rose-600",
  },
  purple: {
    container: "border-purple-100 bg-purple-50/40",
    icon: "bg-purple-100 text-purple-600",
  },
};

const CustomerStatsCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
  subtitle,
}) => {
  const styles = COLOR_STYLES[color] || COLOR_STYLES.blue;

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md ${styles.container}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.icon}`}>
          {Icon && <Icon size={22} strokeWidth={2} />}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          {value ?? 0}
        </h3>
        {subtitle && (
          <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default CustomerStatsCard;

export function ProductStatCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  tint = "#FFFFFF",
}) {
  return (
    <div
      className="min-w-[200px] flex-1 rounded-2xl border border-slate-100 p-4 shadow-sm"
      style={{ backgroundColor: tint }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: iconBg }}
        >
          <Icon
            aria-hidden="true"
            className="h-5 w-5"
            style={{ color: iconColor }}
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="text-2xl font-semibold leading-tight text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
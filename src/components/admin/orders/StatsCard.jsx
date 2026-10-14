export function StatCard({ title, value, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="min-w-[170px] flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="h-[18px] w-[18px]" style={{ color: iconColor }} />
        </div>

        <span className="truncate text-sm font-medium text-slate-500">
          {title}
        </span>
      </div>

      <p className="mt-3 text-xl font-semibold leading-tight text-slate-900">
        {value}
      </p>
    </div>
  );
}

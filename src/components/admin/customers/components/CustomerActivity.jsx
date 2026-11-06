import { Activity, CircleCheck } from "lucide-react";

const CustomerActivity = ({ activities = [] }) => {
  if (!activities.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
        <Activity size={32} className="mx-auto text-slate-300" />
        <p className="mt-3 font-semibold text-slate-700">
          No recent activity
        </p>
        <p className="mt-1 text-sm text-slate-400">
          Customer activity will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {activities.map((activity, index) => (
        <div key={`${activity.title}-${index}`} className="flex gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <CircleCheck size={17} />
          </div>

          <div className="min-w-0 flex-1 border-b border-slate-100 pb-5">
            <p className="text-sm font-semibold text-slate-800">
              {activity.title}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {activity.description}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {new Date(activity.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerActivity;

import { UsersRound } from "lucide-react";

const CustomerHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <UsersRound size={24} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Customers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage customer accounts, monitor purchases and view customer activity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerHeader;

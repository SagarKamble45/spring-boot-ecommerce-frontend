import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  Hash,
} from "lucide-react";

const CustomerPersonalDetails = ({ customer, details }) => {
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {value || "—"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="rounded-xl border border-slate-100 p-5">
      <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-400">
        Personal Information
      </h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <DetailItem
          icon={Hash}
          label="Customer ID"
          value={`#${customer.customerId}`}
        />

        <DetailItem
          icon={UserRound}
          label="Full Name"
          value={customer.customerName}
        />

        <DetailItem
          icon={Mail}
          label="Email Address"
          value={customer.email}
        />

        <DetailItem
          icon={Phone}
          label="Phone Number"
          value={customer.phone}
        />

        <DetailItem
          icon={UserRound}
          label="Gender"
          value={details?.gender}
        />

        <DetailItem
          icon={CalendarDays}
          label="Date of Birth"
          value={formatDate(details?.dateOfBirth)}
        />

        <DetailItem
          icon={CalendarDays}
          label="Date Joined"
          value={formatDate(customer.createdAt)}
        />
      </div>
    </div>
  );
};

export default CustomerPersonalDetails;
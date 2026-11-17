
import {
  ShoppingBag,
  IndianRupee,
  CalendarDays,
  MapPin,
} from "lucide-react";

const CustomerOverview = ({ customer }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);

  const savedAddress = customer.addresses?.[0];

  const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="rounded-xl border border-slate-100 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-500">
        <Icon size={17} />
        <span className="text-sm">{label}</span>
      </div>

      <p className="mt-3 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <InfoCard
          icon={ShoppingBag}
          label="Total Orders"
          value={customer.totalOrders ?? 0}
        />

        <InfoCard
          icon={IndianRupee}
          label="Total Spent"
          value={formatCurrency(customer.totalSpent)}
        />

        <InfoCard
          icon={CalendarDays}
          label="Customer Since"
          value={
            customer.createdAt
              ? new Date(customer.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    month: "short",
                    year: "numeric",
                  },
                )
              : "—"
          }
        />
      </div>

      <div className="rounded-xl border border-slate-100 p-5">
        <div className="mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-blue-600" />
          <h3 className="font-bold text-slate-800">
            Saved Address
          </h3>
        </div>

        {savedAddress ? (
          <div className="space-y-1 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">
              {savedAddress.fullName}
            </p>

            <p>{savedAddress.address}</p>

            <p>
              {savedAddress.city}, {savedAddress.state} -{" "}
              {savedAddress.pincode}
            </p>

            <p>{savedAddress.country}</p>

            <p className="pt-2">{savedAddress.phone}</p>
          </div>
        ) : (
          <p className="text-sm text-slate-400">
            No saved address available.
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerOverview;

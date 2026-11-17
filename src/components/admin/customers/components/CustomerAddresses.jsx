
import { MapPin, Phone, Home } from "lucide-react";

const CustomerAddresses = ({ addresses = [] }) => {
  if (!addresses.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
        <MapPin size={32} className="mx-auto text-slate-300" />
        <p className="mt-3 font-semibold text-slate-700">
          No addresses found
        </p>
        <p className="mt-1 text-sm text-slate-400">
          This customer hasn't saved any addresses yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {addresses.map((address) => (
        <div
          key={address.addressId}
          className="rounded-xl border border-slate-100 p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Home size={18} />
            </div>

            <span className="text-sm font-bold text-slate-800">
              Saved Address
            </span>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">
              {address.fullName}
            </p>

            <p>{address.address}</p>

            <p>
              {address.city}, {address.state}
            </p>

            <p>
              {address.pincode}, {address.country}
            </p>

            <div className="flex items-center gap-2 border-t border-slate-100 pt-3 text-slate-500">
              <Phone size={14} />
              {address.phone || "No phone number"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerAddresses;

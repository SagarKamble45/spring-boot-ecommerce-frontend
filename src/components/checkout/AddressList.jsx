import React from "react";
import {
  MdAdd,
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdEdit,
} from "react-icons/md";

const AddressList = ({
  addresses,
  selectedAddress,
  handleSelectAddress,
  setMode,
  onEditAddress, // new
}) => {
  return (
    <div className="space-y-3">
      {addresses?.map((addr) => {
        const selected = selectedAddress?.addressId === addr.addressId;

        return (
          <label
            key={addr.addressId}
            className={`flex items-start gap-3 rounded-xl border-2 px-4 py-3.5 cursor-pointer transition ${
              selected
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <input
              type="radio"
              name="savedAddress"
              checked={selected}
              onChange={() => handleSelectAddress(addr)}
              className="sr-only"
            />

            <span className="mt-0.5 flex-shrink-0 text-blue-600">
              {selected ? (
                <MdCheckCircle size={20} />
              ) : (
                <MdRadioButtonUnchecked size={20} className="text-gray-300" />
              )}
            </span>

            <span className="text-sm flex-1">
              <span className="block font-semibold text-slate-900">
                {addr.fullName}
                <span className="font-normal text-gray-500"> · {addr.phone}</span>
              </span>

              <span className="block text-gray-600 mt-0.5">
                {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
              </span>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();   // stop the label from also triggering select
                e.stopPropagation();
                onEditAddress(addr);
              }}
              className="mt-0.5 flex-shrink-0 text-gray-400 hover:text-blue-600 transition cursor-pointer"
              aria-label="Edit address"
            >
              <MdEdit size={18} />
            </button>
          </label>
        );
      })}

      <button
        type="button"
        onClick={() => setMode("form")}
        className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 text-blue-600 font-semibold text-sm py-3.5 transition cursor-pointer"
      >
        <MdAdd size={18} />
        Add New Address
      </button>
    </div>
  );
};

export default AddressList;
import React from "react";

/**
 * AddressForm
 *
 * A reusable address entry form. All state and handlers live in the
 * parent component and are passed in as props, so this component
 * stays purely presentational.
 *
 * Props:
 * - formData: { fullName, phone, pincode, address, city, state }
 * - handleFormChange: (e) => void        // onChange handler for all fields
 * - isFormValid: boolean                 // enables/disables Save button
 * - handleSaveAddress: () => void        // called on Save
 * - savedAddresses: array                // used to decide if Cancel shows
 * - handleCancel: () => void             // called on Cancel
 */

function AddressForm({
  formData,
  handleFormChange,
  isFormValid,
  handleSaveAddress,
  savedAddresses = [],
  handleCancel,
}) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Full name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleFormChange}
            placeholder="e.g. Aditi Sharma"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Phone number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            placeholder="+91 98765 43210"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleFormChange}
            placeholder="400001"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 transition"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleFormChange}
            placeholder="Flat / house no., building, street"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleFormChange}
            placeholder="Mumbai"
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            State
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleFormChange}
            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 transition bg-white"
          >
            <option value="">Select state</option>
            <option>Maharashtra</option>
            <option>Delhi</option>
            <option>Karnataka</option>
            <option>Tamil Nadu</option>
            <option>Gujarat</option>
            <option>West Bengal</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-5">
        <button
          onClick={handleSaveAddress}
          disabled={!isFormValid}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl px-6 py-2.5 font-semibold text-sm transition cursor-pointer"
        >
          Save Address
        </button>
        {savedAddresses.length > 0 && (
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 font-medium text-sm cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
export default AddressForm
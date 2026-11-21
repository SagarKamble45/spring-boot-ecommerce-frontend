
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdLocationOn,
} from "react-icons/md";

import AddressForm from "../shared/AddressForm";
import {
  addUpdateUserAddress,
  deleteUserAddress,
  getUserAddresses,
} from "../../store/action";

const EMPTY_FORM = {
  fullName: "",
  phone: "",
  pincode: "",
  address: "",
  city: "",
  state: "",
  country: "India",
};

function ProfileAddresses() {
  const dispatch = useDispatch();

  const {
    address = [],
    addressLoading,
    addressError,
    addressMutationLoading,
  } = useSelector((state) => state.auth);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid =
    formData.fullName.trim() &&
    formData.phone.trim() &&
    formData.pincode.trim() &&
    formData.address.trim() &&
    formData.city.trim() &&
    formData.state.trim();

  const openAddForm = () => {
    setEditingAddress(null);
    setFormData(EMPTY_FORM);
    setIsFormOpen(true);
  };

  const handleEditAddress = (selectedAddress) => {
    setEditingAddress(selectedAddress);

    setFormData({
      fullName: selectedAddress.fullName || "",
      phone: selectedAddress.phone || "",
      pincode: selectedAddress.pincode || "",
      address: selectedAddress.address || "",
      city: selectedAddress.city || "",
      state: selectedAddress.state || "",
      country: selectedAddress.country || "India",
    });

    setIsFormOpen(true);
  };

  const handleSaveAddress = async () => {
    if (!isFormValid || addressMutationLoading) return;

    const payload = {
      ...formData,
      ...(editingAddress && {
        addressId: editingAddress.addressId,
      }),
    };

    const success = await dispatch(
      addUpdateUserAddress(payload, toast)
    );

    if (success) {
      setIsFormOpen(false);
      setEditingAddress(null);
      setFormData(EMPTY_FORM);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    await dispatch(deleteUserAddress(addressId, toast));
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
    setFormData(EMPTY_FORM);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
      {/* Section heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Saved Addresses
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your delivery locations.
          </p>
        </div>

        {!isFormOpen && (
          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold transition"
          >
            <MdAdd className="text-lg" />
            Add Address
          </button>
        )}
      </div>

      {/* Address form */}
      {isFormOpen && (
        <div className="border border-slate-200 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-slate-900 mb-5">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h3>

          <AddressForm
            formData={formData}
            handleFormChange={handleFormChange}
            isFormValid={Boolean(isFormValid) && !addressMutationLoading}
            handleSaveAddress={handleSaveAddress}
            savedAddresses={address}
            handleCancel={handleCancel}
          />

          {addressMutationLoading && (
            <p className="text-sm text-slate-500 mt-3">
              Saving address...
            </p>
          )}
        </div>
      )}

      {/* Loading */}
      {addressLoading && (
        <div className="py-10 text-center text-sm text-slate-500">
          Loading saved addresses...
        </div>
      )}

      {/* Error */}
      {!addressLoading && addressError && (
        <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-600">
          {addressError}
          <button
            type="button"
            onClick={() => dispatch(getUserAddresses())}
            className="ml-2 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty state */}
      {!addressLoading &&
        !addressError &&
        address.length === 0 &&
        !isFormOpen && (
          <div className="rounded-xl border border-dashed border-slate-300 py-10 px-5 text-center">
            <MdLocationOn className="text-4xl text-slate-300 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800">
              No saved addresses yet
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Add an address to make your next checkout easier.
            </p>
            <button
              type="button"
              onClick={openAddForm}
              className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Add your first address
            </button>
          </div>
        )}

      {/* Address cards */}
      {!addressLoading && !addressError && address.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {address.map((item) => (
            <div
              key={item.addressId}
              className="rounded-xl border border-slate-200 p-5 hover:border-blue-200 hover:shadow-sm transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-9 w-9 shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <MdLocationOn className="text-xl" />
                  </span>

                  <h3 className="font-semibold text-slate-900 truncate">
                    {item.fullName}
                  </h3>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleEditAddress(item)}
                    aria-label="Edit address"
                    className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                  >
                    <MdEdit className="text-lg" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteAddress(item.addressId)}
                    aria-label="Delete address"
                    disabled={addressMutationLoading}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 transition"
                  >
                    <MdDelete className="text-lg" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-1.5 text-sm text-slate-600">
                <p>{item.address}</p>
                <p>
                  {item.city}, {item.state} - {item.pincode}
                </p>
                <p>{item.country}</p>
                <p className="pt-2 font-medium text-slate-700">
                  Phone: {item.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProfileAddresses;

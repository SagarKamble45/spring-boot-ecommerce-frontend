import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import AddressForm from "../../shared/AddressForm";
import {
  addUpdateUserAddress,
  getUserAddresses,
  deleteUserAddress,
} from "../../../store/action";

const initialFormData = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
};

function MyAddress() {
  const dispatch = useDispatch();

  const { address = [] } = useSelector((state) => state.auth);

  const [showForm, setShowForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

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
    formData.fullName.trim() !== "" &&
    /^\d{10}$/.test(formData.phone.replace(/\D/g, "").slice(-10)) &&
    formData.address.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state.trim() !== "" &&
    /^\d{6}$/.test(formData.pincode);

  const handleAddAddress = () => {
    setFormData(initialFormData);
    setEditingAddressId(null);
    setShowForm(true);
  };

  const handleEditAddress = (item) => {
    setFormData({
      fullName: item.fullName || "",
      phone: item.phone || "",
      address: item.address || "",
      city: item.city || "",
      state: item.state || "",
      country: item.country || "India",
      pincode: item.pincode || "",
    });

    setEditingAddressId(item.addressId);
    setShowForm(true);
  };

  const handleDeleteAddress = async (addressId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );
    if (!confirmed) return;
    await dispatch(deleteUserAddress(addressId, toast));
  };

  const handleSaveAddress = async () => {
    if (!isFormValid) {
      toast.error("Please enter valid address details.");
      return;
    }

    const payload = {
      ...formData,
      phone: formData.phone.replace(/\D/g, "").slice(-10),
      addressId: editingAddressId || undefined,
    };

    const result = await dispatch(addUpdateUserAddress(payload, toast));

    if (result) {
      setShowForm(false);
      setEditingAddressId(null);
      setFormData(initialFormData);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddressId(null);
    setFormData(initialFormData);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <Link
            to="/profile"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
          >
            <FaArrowLeft />
            Back to Profile
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                My Addresses
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Manage your saved delivery addresses.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddAddress}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <FaPlus />
              Add Address
            </button>
          </div>
        </div>

        {showForm && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-slate-900">
              {editingAddressId ? "Edit Address" : "Add New Address"}
            </h2>

            <AddressForm
              formData={formData}
              handleFormChange={handleFormChange}
              isFormValid={isFormValid}
              handleSaveAddress={handleSaveAddress}
              savedAddresses={address}
              handleCancel={handleCancel}
            />
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Saved Addresses
            </h2>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
              {address.length} Addresses
            </span>
          </div>

          {address.length === 0 ? (
            <div className="py-12 text-center">
              <FaMapMarkerAlt className="mx-auto text-4xl text-slate-300" />
              <h3 className="mt-4 font-semibold text-slate-800">
                No saved addresses yet
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Add your first delivery address.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {address.map((item) => (
                <div
                  key={item.addressId}
                  className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <FaMapMarkerAlt />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900">
                          {item.fullName}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {item.phone}
                        </p>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {item.address}, {item.city}, {item.state} -{" "}
                          {item.pincode}, {item.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => handleEditAddress(item)}
                        className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                        title="Edit address"
                      >
                        <FaEdit />
                      </button>

                      {/* Delete */}
                      <button 
                        type="button"
                        onClick={()=> handleDeleteAddress(item.addressId)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-100 hover:text-red-600"
                        title="Delete address"
                        > 
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAddress;

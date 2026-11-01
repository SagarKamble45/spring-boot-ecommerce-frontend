
import { useEffect, useState } from "react";
import { X, Store, UserRound, Mail, Phone } from "lucide-react";

const INITIAL_FORM = {
  sellerName: "",
  email: "",
  storeName: "",
  phone: "",
  status: "ACTIVE",
};

const SellerFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  seller = null,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(seller);

  useEffect(() => {
    if (isOpen) {
      setFormData(
        seller
          ? {
              sellerName: seller.sellerName || "",
              email: seller.email || "",
              storeName: seller.storeName || "",
              phone: seller.phone || "",
              status: seller.status || "ACTIVE",
            }
          : INITIAL_FORM
      );

      setErrors({});
    }
  }, [isOpen, seller]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.sellerName.trim()) {
      newErrors.sellerName = "Seller name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.storeName.trim()) {
      newErrors.storeName = "Store name is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid phone number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    onSubmit?.(formData);
  };

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 ${
      errors[field] ? "border-rose-400" : "border-slate-200"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditMode ? "Edit Seller" : "Add New Seller"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isEditMode
                ? "Update the seller information."
                : "Enter the details to register a new seller."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[65vh] space-y-5 overflow-y-auto p-6">
            {/* Seller Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Seller Name <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleChange}
                  placeholder="Enter seller name"
                  className={`${inputClass("sellerName")} pl-10`}
                />
              </div>

              {errors.sellerName && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.sellerName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seller@example.com"
                  className={`${inputClass("email")} pl-10`}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Store Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Store Name <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <Store
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="Enter store name"
                  className={`${inputClass("storeName")} pl-10`}
                />
              </div>

              {errors.storeName && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.storeName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <Phone
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className={`${inputClass("phone")} pl-10`}
                />
              </div>

              {errors.phone && (
                <p className="mt-1 text-xs text-rose-500">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Status - Edit Mode */}
            {isEditMode && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Seller Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={inputClass("status")}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              {isEditMode ? "Save Changes" : "Add Seller"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerFormModal;

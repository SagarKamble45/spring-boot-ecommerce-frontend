
import { useEffect, useState } from "react";
import {
  X,
  Store,
  UserRound,
  Mail,
  Phone,
  Lock,
} from "lucide-react";

const INITIAL_FORM = {
  userName: "",
  email: "",
  password: "",
  storeName: "",
  phone: "",
  sellerStatus: "ACTIVE",
};

const SellerFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  seller = null,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(seller);

  // Initialize form whenever the modal opens or seller changes.
  useEffect(() => {
    if (!isOpen) return;

    setFormData(
      seller
        ? {
            userName: seller.userName || seller.sellerName || "",
            email: seller.email || "",
            password: "",
            storeName: seller.storeName || "",
            phone: seller.phone || "",
            sellerStatus: seller.sellerStatus || "ACTIVE",
          }
        : { ...INITIAL_FORM },
    );

    setErrors({});
  }, [isOpen, seller]);

  if (!isOpen) return null;

  // Handle input changes.
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

  // Validate form fields.
  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required.";
    } else if (formData.userName.trim().length > 20) {
      newErrors.userName = "Username cannot exceed 20 characters.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    } else if (formData.email.trim().length > 50) {
      newErrors.email = "Email cannot exceed 50 characters.";
    }

    // Store name validation
    if (!formData.storeName.trim()) {
      newErrors.storeName = "Store name is required.";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid phone number (10–15 digits).";
    }

    // Password validation
    if (!isEditMode && !formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (
      formData.password.trim() &&
      (formData.password.length < 6 || formData.password.length > 120)
    ) {
      newErrors.password = "Password must be between 6 and 120 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit form.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    await onSubmit?.({
      ...formData,
      userName: formData.userName.trim(),
      email: formData.email.trim(),
      storeName: formData.storeName.trim(),
      phone: formData.phone.trim(),
    });
  };

  // Shared input styling.
  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 ${
      errors[field] ? "border-rose-400" : "border-slate-200"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose?.();
        }
      }}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="seller-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2
              id="seller-modal-title"
              className="text-xl font-bold text-slate-900"
            >
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
            disabled={isSubmitting}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[65vh] space-y-5 overflow-y-auto p-6">
            {/* Username */}
            <div>
              <label
                htmlFor="seller-username"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Username <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="seller-username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter username"
                  maxLength={20}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.userName)}
                  aria-describedby={
                    errors.userName ? "seller-username-error" : undefined
                  }
                  className={`${inputClass("userName")} pl-10`}
                />
              </div>

              {errors.userName && (
                <p
                  id="seller-username-error"
                  className="mt-1 text-xs text-rose-500"
                >
                  {errors.userName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="seller-email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="seller-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seller@example.com"
                  maxLength={50}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "seller-email-error" : undefined
                  }
                  className={`${inputClass("email")} pl-10`}
                />
              </div>

              {errors.email && (
                <p
                  id="seller-email-error"
                  className="mt-1 text-xs text-rose-500"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="seller-password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password{" "}
                {!isEditMode && (
                  <span className="text-rose-500">*</span>
                )}
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="seller-password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={
                    isEditMode
                      ? "Leave blank to keep current password"
                      : "Enter password"
                  }
                  minLength={6}
                  maxLength={120}
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "seller-password-error" : undefined
                  }
                  className={`${inputClass("password")} pl-10`}
                />
              </div>

              {errors.password && (
                <p
                  id="seller-password-error"
                  className="mt-1 text-xs text-rose-500"
                >
                  {errors.password}
                </p>
              )}

              {isEditMode && (
                <p className="mt-1 text-xs text-slate-400">
                  Leave blank if you don't want to change the password.
                </p>
              )}
            </div>

            {/* Store Name */}
            <div>
              <label
                htmlFor="seller-store"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Store Name <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <Store
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="seller-store"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="Enter store name"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.storeName)}
                  aria-describedby={
                    errors.storeName ? "seller-store-error" : undefined
                  }
                  className={`${inputClass("storeName")} pl-10`}
                />
              </div>

              {errors.storeName && (
                <p
                  id="seller-store-error"
                  className="mt-1 text-xs text-rose-500"
                >
                  {errors.storeName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="seller-phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone Number <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <Phone
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="seller-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  maxLength={15}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone ? "seller-phone-error" : undefined
                  }
                  className={`${inputClass("phone")} pl-10`}
                />
              </div>

              {errors.phone && (
                <p
                  id="seller-phone-error"
                  className="mt-1 text-xs text-rose-500"
                >
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Seller Status - Edit Mode Only */}
            {isEditMode && (
              <div>
                <label
                  htmlFor="seller-status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Seller Status
                </label>

                <select
                  id="seller-status"
                  name="sellerStatus"
                  value={formData.sellerStatus}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>

                <p className="mt-1 text-xs text-slate-400">
                  Inactive sellers cannot operate their store once access
                  restrictions are implemented.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Add Seller"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerFormModal;

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { X } from "lucide-react";

import Spinner from "../../Spinner";
import ProductFormField, { inputClass } from "./ProductFormField";
import ImageUploadField from "./ImageUploadField";
import ProductImage from "./ProductImage";
import { formatAmount } from "../orders/utils/orderFormat";
import { fetchCategoryOptions, updateProduct } from "../../../store/action";

const FORM_ID = "edit-product-form";

/**
 * Popup form to edit a product (same layout as AddProductModal).
 * Props:
 *  - open:             boolean
 *  - product:          the table row  { id, name, description, category (name),
 *                      price, discount, quantity, image }
 *  - onClose:          () => void
 *  - onProductUpdated: (updatedProduct) => void   (refresh your list here)
 */
export default function EditProduct({
  open,
  product,
  onClose,
  onProductUpdated = () => {},
}) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categoryOptions);

  const [loader, setLoader] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  // The product only carries categoryName, so find its id in the category list.
  const currentCategoryId = useMemo(() => {
    const match = (categories ?? []).find(
      (category) => category.categoryName === product?.category,
    );
    return match ? String(match.categoryId) : "";
  }, [categories, product]);

  // Make sure the category list is there.
  useEffect(() => {
    if (open && (!categories || categories.length === 0)) {
      dispatch(fetchCategoryOptions());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, dispatch]);

  // Fill the form each time a (different) product is opened.
  useEffect(() => {
    if (!open || !product) return;

    reset({
      productName: product.name ?? "",
      categoryId: currentCategoryId,
      price: product.price ?? "",
      discount: product.discount ?? 0,
      quantity: product.quantity ?? 0,
      description: product.description ?? "",
    });
    setImageFile(null);
    // currentCategoryId is handled by the effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, product, reset]);

  // Categories may arrive after the form was filled: select the right one then.
  useEffect(() => {
    if (open && currentCategoryId && !getValues("categoryId")) {
      setValue("categoryId", currentCategoryId);
    }
  }, [open, currentCategoryId, getValues, setValue]);

  // Live "special price" preview, same maths the backend uses.
  const price = Number(watch("price")) || 0;
  const discount = Number(watch("discount")) || 0;
  const specialPrice = Math.max(
    0,
    Number((price - (price * discount) / 100).toFixed(2)),
  );

  const handleClose = () => {
    if (loader) return; // don't close mid-request
    setImageFile(null);
    onClose();
  };

  const onSubmit = async (values) => {
    const payload = {
      productName: values.productName.trim(),
      description: values.description.trim(),
      price: values.price,
      discount: values.discount,
      quantity: values.quantity,
      specialPrice,
    };

    const result = await dispatch(
      updateProduct(
        {
          productId: product.id,
          categoryId: values.categoryId,
          product: payload,
          imageFile,
        },
        toast,
        setLoader,
      ),
    );

    if (result?.ok) {
      setImageFile(null);
      onClose();
      onProductUpdated(result.data);
    }
  };

  return (
    // z-[60] sits above the sticky Navbar (z-50) and the admin menu button (z-40)
    <Dialog open={open} onClose={handleClose} className="relative z-[60]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-900/40 transition-opacity duration-200 data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex items-end justify-center sm:items-center sm:p-4">
        <DialogPanel
          transition
          className="flex max-h-[100dvh] w-full max-w-2xl transform flex-col rounded-t-2xl bg-white shadow-2xl transition duration-200 data-closed:translate-y-4 data-closed:opacity-0 sm:max-h-[90vh] sm:rounded-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
            <div>
              <DialogTitle className="text-lg font-semibold text-slate-900">
                Edit Product
              </DialogTitle>
              <p className="mt-0.5 text-sm text-slate-400">
                {product ? `Product #${product.id}` : ""} Update the details
                below and save.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="shrink-0 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form body (scrolls on small screens) */}
          <form
            id={FORM_ID}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex-1 overflow-y-auto p-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <ProductFormField
                label="Product name"
                htmlFor="editProductName"
                required
                error={errors.productName?.message}
                className="sm:col-span-2"
              >
                <input
                  id="editProductName"
                  type="text"
                  disabled={loader}
                  className={inputClass(!!errors.productName)}
                  {...register("productName", {
                    required: "Product name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters allowed",
                    },
                  })}
                />
              </ProductFormField>

              <ProductFormField
                label="Category"
                htmlFor="editCategoryId"
                required
                error={errors.categoryId?.message}
              >
                <select
                  id="editCategoryId"
                  disabled={loader}
                  className={inputClass(!!errors.categoryId)}
                  {...register("categoryId", {
                    required: "Please select a category",
                  })}
                >
                  <option value="">Select category</option>
                  {(categories ?? []).map((category) => (
                    <option
                      key={category.categoryId}
                      value={String(category.categoryId)}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </ProductFormField>

              <ProductFormField
                label="Quantity in stock"
                htmlFor="editQuantity"
                required
                error={errors.quantity?.message}
              >
                <input
                  id="editQuantity"
                  type="number"
                  min="0"
                  step="1"
                  disabled={loader}
                  className={inputClass(!!errors.quantity)}
                  {...register("quantity", {
                    required: "Quantity is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Quantity can't be negative" },
                    validate: (value) =>
                      Number.isInteger(value) ||
                      "Quantity must be a whole number",
                  })}
                />
              </ProductFormField>

              <ProductFormField
                label="Price (₹)"
                htmlFor="editPrice"
                required
                error={errors.price?.message}
              >
                <input
                  id="editPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  disabled={loader}
                  className={inputClass(!!errors.price)}
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: { value: 0.01, message: "Price must be above 0" },
                  })}
                />
              </ProductFormField>

              <ProductFormField
                label="Discount (%)"
                htmlFor="editDiscount"
                error={errors.discount?.message}
              >
                <input
                  id="editDiscount"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  disabled={loader}
                  className={inputClass(!!errors.discount)}
                  {...register("discount", {
                    setValueAs: (value) => (value === "" ? 0 : Number(value)),
                    min: { value: 0, message: "Discount can't be negative" },
                    max: { value: 100, message: "Discount can't exceed 100%" },
                  })}
                />
              </ProductFormField>

              <ProductFormField
                label="Special price"
                htmlFor="editSpecialPrice"
                hint="Calculated from price and discount."
                className="sm:col-span-2"
              >
                <input
                  id="editSpecialPrice"
                  type="text"
                  readOnly
                  disabled
                  value={formatAmount(specialPrice)}
                  className={inputClass(false)}
                />
              </ProductFormField>

              <ProductFormField
                label="Description"
                htmlFor="editDescription"
                required
                error={errors.description?.message}
                className="sm:col-span-2"
              >
                <textarea
                  id="editDescription"
                  rows={4}
                  disabled={loader}
                  className={`${inputClass(!!errors.description)} resize-y`}
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                />
              </ProductFormField>

              <ProductFormField
                label="Product image"
                htmlFor="productImage"
                hint="Optional. Leave empty to keep the current image."
                className="sm:col-span-2"
              >
                {product?.image && !imageFile && (
                  <div className="mb-2 flex items-center gap-3 rounded-lg bg-slate-50 p-2.5">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16"
                      iconClassName="h-6 w-6"
                    />
                    <p className="text-xs text-slate-500">
                      Current image. Choose a new one below to replace it.
                    </p>
                  </div>
                )}

                <ImageUploadField
                  file={imageFile}
                  onChange={setImageFile}
                  disabled={loader}
                />
              </ProductFormField>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-slate-100 p-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loader}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              form={FORM_ID}
              disabled={loader}
              className="inline-flex min-w-32 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {loader ? (
                <>
                  <Spinner />
                  <span>Saving...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Divider } from "@mui/material";
import Status from "../Status";
import { MdDone, MdClose } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/action";
import toast from "react-hot-toast";

const formatINR = (value) =>
  Number(value).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

function ProductViewModel({ open, setOpen, product, isAvailable }) {
  const { id, productName, image, description, price, discount, specialPrice, quantity } =
    product;
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(
      addToCart(
        { image, productName, description, specialPrice, price, productId: id, quantity },
        qty,
        toast
      )
    );
  };

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-50"
      onClose={() => setOpen(false)}
    >
      <DialogBackdrop className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all grid md:grid-cols-2">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-20 p-2 rounded-full bg-white/90 shadow-md hover:bg-slate-100 transition"
            >
              <IoClose size={20} />
            </button>

            {/* Left: image panel */}
            <div className="relative bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center p-10 min-h-[280px] md:min-h-[520px]">
              {discount > 0 && (
                <span className="absolute top-5 left-5 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {Number(discount)}% off
                </span>
              )}
              {image && (
                <img
                  src={image}
                  alt={productName}
                  className="max-h-[240px] md:max-h-[420px] w-auto object-contain drop-shadow-md"
                />
              )}
            </div>

            {/* Right: details panel */}
            <div className="flex flex-col p-6 md:p-8 md:max-h-[85vh]">
              <div className="flex-1 overflow-y-auto pr-1">
                <div className="flex items-center justify-between gap-3">
                  {isAvailable ? (
                    <Status
                      text="In Stock"
                      icon={MdDone}
                      bg="bg-emerald-100"
                      color="text-emerald-700"
                    />
                  ) : (
                    <Status
                      text="Out of Stock"
                      icon={MdClose}
                      bg="bg-red-100"
                      color="text-red-700"
                    />
                  )}
                </div>

                <DialogTitle className="text-2xl font-bold text-slate-900 mt-3">
                  {productName}
                </DialogTitle>
                <p className="text-slate-500 text-sm mt-1">
                  Premium quality product
                </p>

                <div className="mt-5 flex items-baseline gap-3 flex-wrap">
                  {specialPrice ? (
                    <>
                      <span className="text-3xl font-bold text-slate-900">
                        {formatINR(specialPrice)}
                      </span>
                      <span className="text-base text-slate-400 line-through">
                        {formatINR(price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-slate-900">
                      {formatINR(price)}
                    </span>
                  )}
                </div>
                {specialPrice > 0 && (
                  <span className="inline-block mt-2 text-sm font-medium text-blue-600">
                    You save {formatINR(price - specialPrice)}
                  </span>
                )}

                <Divider className="my-5" />

                <h3 className="text-sm font-semibold text-slate-800 tracking-wide mb-2">
                  Description
                </h3>
                <p className="text-slate-600 leading-7 text-sm">
                  {description}
                </p>
              </div>

              {/* Sticky action bar */}
              <div className="pt-5 mt-5 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-full overflow-hidden">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      disabled={!isAvailable}
                      className="px-3 py-3 text-slate-600 hover:bg-slate-50 transition disabled:opacity-40"
                    >
                      <FaMinus size={11} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-slate-800">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      disabled={!isAvailable}
                      className="px-3 py-3 text-slate-600 hover:bg-slate-50 transition disabled:opacity-40"
                    >
                      <FaPlus size={11} />
                    </button>
                  </div>

                  <button
                    disabled={!isAvailable}
                    onClick={addToCartHandler}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-white transition ${
                      isAvailable
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-blue-500/60 cursor-not-allowed"
                    }`}
                  >
                    <FaShoppingCart />
                    {isAvailable ? "Add to Cart" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductViewModel;
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModel from "./ProductViewModel";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/action";
import toast from "react-hot-toast";

const formatINR = (value) =>
  Number(value).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

function ProductCard({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
}) {

  
  const [openProductViewModel, setOpenProductViewModel] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const btnLoader = false;
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();

  const handleProductView = () => {
    setSelectedViewProduct({
      id: productId,
      productName,
      image,
      description,
      quantity,
      price,
      discount,
      specialPrice,
    });
    setOpenProductViewModel(true);
  };

  const addToCartHandler = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart(
        { image, productName, description, specialPrice, price, productId, quantity },
        1,
        toast
      )
    );
  };

  return (
    <div className="group border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transition-shadow duration-300 bg-white flex flex-col">
      <div
        onClick={handleProductView}
        className="relative w-full overflow-hidden aspect-square cursor-pointer bg-slate-50"
      >
        <img
          src={image}
          alt={productName}
          className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />

        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {Number(discount)}% off
          </span>
        )}

        {!isAvailable && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-slate-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2
          onClick={handleProductView}
          className="text-lg font-semibold text-slate-800 mb-1 cursor-pointer hover:text-blue-500 transition-colors duration-200 line-clamp-1"
        >
          {productName}
        </h2>

        <p className="text-gray-600 text-sm min-h-10 mb-3">
          {truncateText(description, 80)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3">
          {specialPrice ? (
            <div className="flex flex-col leading-tight">
              <span className="text-gray-400 text-sm line-through">
                {formatINR(price)}
              </span>
              <span className="text-xl font-bold text-slate-700">
                {formatINR(specialPrice)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-slate-700">
              {formatINR(price)}
            </span>
          )}

          <button
            disabled={!isAvailable || btnLoader}
            onClick={addToCartHandler}
            className={`flex items-center justify-center gap-2 py-2 px-3 w-36 rounded-full text-white text-sm font-medium transition-colors duration-300
              ${
                isAvailable
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  : "bg-blue-500/60 cursor-not-allowed"
              }`}
          >
            <FaShoppingCart />
            {isAvailable ? "Add to Cart" : "Stock Out"}
          </button>
        </div>
      </div>

      <ProductViewModel
        open={openProductViewModel}
        setOpen={setOpenProductViewModel}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  );
}

export default ProductCard;
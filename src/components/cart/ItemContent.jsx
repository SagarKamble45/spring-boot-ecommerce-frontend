import React, { useState } from "react";
import SetQuantity from "./SetQuantity";
import { MdDeleteOutline } from "react-icons/md";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../../store/action";
import toast from "react-hot-toast";

function ItemContent({
  formatPrice,
  productId,
  productName,
  image,
  description,
  quantity,
  stock,
  price,
  discount,
  specialPrice,
  cartId,
}) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  // console.log(quantity)
  const dispatch = useDispatch();

  const handleQtyIncrease = (cartItems) => {
    dispatch(
      increaseCartQuantity(
        cartItems,
        toast,
        currentQuantity,
        setCurrentQuantity,
      ),
    );
  };

  const handleQtyDecrease = (cartItems) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      // console.log("Decrease Quantity", newQuantity);
      dispatch(decreaseCartQuantity(cartItems, newQuantity));
    }
  };

  const removeItemFromCart = (cartItems) => {
    dispatch(removeFromCart(cartItems, toast))
  };

  return (
    <div className="grid md:grid-cols-5 gap-4 px-6 py-6 items-center border-t">
      {/* Product */}
      <div className="md:col-span-2 flex items-center gap-4">
        <img
          src={image}
          alt={productName}
          className="w-24 h-24 rounded-xl object-cover border"
        />

        <div>
          <h3 className="font-semibold text-md">{productName}</h3>
          <p className="text-sm text-gray-500">
            {truncateText(description, 10)}
          </p>

          <div>
            <button
              onClick={() =>
                removeItemFromCart({
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
                  stock,
                })
              }
              className="flex items-center gap-1 mt-2 text-red-500 hover:text-red-600 text-sm font-medium transition cursor-pointer"
            >
              <MdDeleteOutline size={18} />
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="text-center font-medium">{formatPrice(specialPrice)}</div>

      {/* Quantity */}
      <div className="flex justify-center">
        <SetQuantity
          quantity={currentQuantity}
          cardCounter={true}
          handleQtyIncrease={() =>
            handleQtyIncrease({
              image,
              productName,
              description,
              specialPrice,
              price,
              productId,
              quantity,
              stock,
            })
          }
          handleQtyDecrease={() =>
            handleQtyDecrease({
              image,
              productName,
              description,
              specialPrice,
              price,
              productId,
              quantity,
              stock,
            })
          }
        />
      </div>

      {/* Total */}
      <div className="text-center font-semibold text-blue-600">
        {formatPrice(specialPrice * currentQuantity)}
      </div>
    </div>
  );
}

export default ItemContent;

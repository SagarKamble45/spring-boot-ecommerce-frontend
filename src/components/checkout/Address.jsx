import Skeleton from "@mui/material/Skeleton";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { MdCheckCircle, MdRadioButtonUnchecked, MdAdd } from "react-icons/md";
import AddressForm from "../shared/AddressForm";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUpdateUserAddress, getUserAddresses } from "../../store/action";
import AddressList from "./AddressList";

const EMPTY_FORM = {
  fullName: "",
  phone: "",
  pincode: "",
  address: "",
  city: "",
  state: "",
};

function Address({ selectedAddress, handleSelectAddress }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const { address, isAddressLoading } = useSelector((state) => state.auth);
  const savedAddresses = address || [];

  const [mode, setMode] = useState("list"); // "list" | "form"
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingAddress, setEditingAddress] = useState(null); // null = adding new, object = editing existing

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid =
    formData.fullName.trim() &&
    formData.phone.trim() &&
    formData.pincode.trim() &&
    formData.address.trim() &&
    formData.city.trim() &&
    formData.state.trim();

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setFormData({
      fullName: addr.fullName,
      phone: addr.phone,
      pincode: addr.pincode,
      address: addr.address,
      city: addr.city,
      state: addr.state,
    });
    setMode("form");
  };

  const handleSaveAddress = async () => {
    if (!isFormValid) return;

    if (editingAddress) {
      // update existing — keep the real addressId so the action knows to PUT/PATCH
      const updatedAddress = { ...editingAddress, ...formData };
      dispatch(addUpdateUserAddress(updatedAddress, toast));
      handleSelectAddress(updatedAddress);
    } else {
      // create new
      const newAddress = { ...formData, country: "India" };
      dispatch(addUpdateUserAddress(newAddress, toast));
      handleSelectAddress(newAddress);
    }

    setEditingAddress(null);
    setFormData(EMPTY_FORM);
    setMode("list");
  };

  const handleCancel = () => {
    setEditingAddress(null);
    setFormData(EMPTY_FORM);
    setMode("list");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="h-7 w-7 rounded-full bg-blue-100 text-blue-600 text-sm font-bold flex items-center justify-center">
          1
        </span>
        <h2 className="text-lg font-bold text-slate-900">Shipping Address</h2>
      </div>
      <p className="text-gray-500 text-sm ml-10 mb-6">
        {savedAddresses.length > 0
          ? "Choose a delivery address"
          : "Add a new delivery address"}
      </p>

      {mode === "list" ? (
        <div>
          {isAddressLoading ? (
            <Box sx={{ width: 700 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          ) : (
            <AddressList
              addresses={savedAddresses}
              selectedAddress={selectedAddress}
              handleSelectAddress={handleSelectAddress}
              setMode={setMode}
              onEditAddress={handleEditAddress}
            />
          )}
        </div>
      ) : (
        <AddressForm
          formData={formData}
          handleFormChange={handleFormChange}
          isFormValid={isFormValid}
          handleSaveAddress={handleSaveAddress}
          savedAddresses={savedAddresses}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Address;
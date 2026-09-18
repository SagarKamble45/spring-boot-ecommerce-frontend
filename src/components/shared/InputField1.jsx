import React from "react";

function InputField({
  label,
  id,
  type = "text",
  errors,
  register,
  required = false,
  message,
  className = "",
  min,
  value,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        min={min}
        {...register(
          id,
          required
            ? {
                required: message || `${label} is required`,
              }
            : {}
        )}
        className={`
          w-full px-4 py-3
          border border-gray-200
          rounded-xl
          bg-white
          outline-none
          transition-all duration-200
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          ${errors?.[id] ? "border-red-500" : ""}
          ${className}
        `}
      />

      {errors?.[id] && (
        <p className="text-sm text-red-500">
          {errors[id].message}
        </p>
      )}
    </div>
  );
}

export default InputField;
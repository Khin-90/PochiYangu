import React from "react";

const Input = ({ type, value, onChange, placeholder, className }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border p-2 w-full mb-4 ${className}`}
    />
  );
};

export default Input;

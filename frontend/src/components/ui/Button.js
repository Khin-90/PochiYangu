import React from "react";

const Button = ({ children, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

import React from "react";

const Button = ({ text, onClick, disabled, type = "button", ...props }) => {
  return (
    <button
      className="button"
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};
export default Button;

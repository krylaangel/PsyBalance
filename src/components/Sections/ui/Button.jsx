import React from "react";

const Button = ({ text, onClick, disabled, ...props }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled} {...props}>
      {text}
    </button>
  );
};
export default Button;

import React from "react";

import styles from "./Button.module.css";

const Button = ({
  text,
  onClick,
  disabled,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
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

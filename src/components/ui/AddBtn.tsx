import React, { ButtonHTMLAttributes } from "react";

type AddBtnProps = ButtonHTMLAttributes<HTMLButtonElement>;

const AddBtn = ({
  onClick,
  disabled,
  "aria-label": ariaLabel,
}: AddBtnProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      aria-label={ariaLabel}
      className={`add-btn ${disabled ? "u-muted" : ""}`}
    >
      <i className="bi bi-plus-circle" />
    </button>
  );
};

export default AddBtn;

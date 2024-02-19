import React, { useState } from "react";
import "./ConfirmDelete.scss";

type ConfirmDeleteProps = {
  title: string;
  message: string;
  onConfirm: () => void;
};

const useConfirmDelete = () => {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const showConfirmDelete = () => setIsConfirmDelete(true);
  const closeConfirmDelete = () => setIsConfirmDelete(false);

  const ConfirmDelete = ({ title, message, onConfirm }: ConfirmDeleteProps) => {
    if (isConfirmDelete)
      return (
        <div className="confirm-delete">
          <h3>{title}</h3>
          <p>{message}</p>
          <div className="confirm-delete__btns">
            <button className="u-btn" onClick={() => closeConfirmDelete()}>
              Anuluj
            </button>
            <button
              className="confirm-delete__confirm-btn u-btn"
              onClick={() => onConfirm()}
            >
              Potwierdź
            </button>
          </div>
        </div>
      );
    else return null;
  };

  return {
    ConfirmDelete,
    isConfirmDelete,
    showConfirmDelete,
    closeConfirmDelete,
  };
};

export default useConfirmDelete;

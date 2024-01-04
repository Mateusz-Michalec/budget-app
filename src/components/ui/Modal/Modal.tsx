import React, { ForwardedRef, ReactNode, forwardRef } from "react";
import "./Modal.scss";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  closeModal: () => void;
  isModal: boolean;
};

const Modal = forwardRef(
  (
    { children, closeModal, isModal }: ModalProps,
    ref: ForwardedRef<HTMLDialogElement>
  ) => {
    if (!isModal) return null;
    return createPortal(
      <dialog onClick={() => closeModal()} ref={ref} className="modal">
        <div onClick={(e) => e.stopPropagation()} className="modal__content">
          <button
            type="button"
            aria-label="Zamknij okno"
            className="modal__close"
            onClick={() => closeModal()}
          >
            <i className="bi bi-x-lg"></i>
          </button>
          {children}
        </div>
      </dialog>,
      document.getElementById("root")!
    );
  }
);

export default Modal;

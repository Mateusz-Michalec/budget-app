import React, { ForwardedRef, ReactNode, forwardRef } from "react";
import "./Modal.scss";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
};

const Modal = forwardRef(
  ({ children }: ModalProps, ref: ForwardedRef<HTMLDialogElement>) => {
    const closeModal = () =>
      typeof ref !== "function" && ref?.current ? ref?.current.close() : null;

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

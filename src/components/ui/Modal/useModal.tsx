import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (isModal) modalRef.current?.showModal();
    else modalRef.current?.close();
  }, [isModal]);

  const showModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const Modal = ({ children }: { children?: ReactNode }) => {
    if (!isModal) return null;
    return createPortal(
      <dialog onClick={() => closeModal()} ref={modalRef} className="modal">
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
  };

  return { Modal, showModal, closeModal };
};

export default useModal;

import React, { useEffect, useRef, useState } from "react";

const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (isModal) modalRef.current?.showModal();
    else modalRef.current?.close();
  }, [isModal]);

  const showModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  return { modalRef, isModal, showModal, closeModal };
};

export default useModal;

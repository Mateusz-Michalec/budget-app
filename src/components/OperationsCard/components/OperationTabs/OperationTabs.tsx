import React from "react";
import { OperationsType } from "../../OperationsCard";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../ui/Modal/Modal";
import AddEditTransaction from "../../../AddTransaction/AddEditTransaction";
import "./OperationsTabs.scss";

type OperationTabsProps = {
  operationType: OperationsType;
  setOperationType: React.Dispatch<React.SetStateAction<OperationsType>>;
};

const OperationTabs = ({
  operationType,
  setOperationType,
}: OperationTabsProps) => {
  const { modalRef, isModal, closeModal, showModal } = useModal();

  return (
    <>
      <Modal ref={modalRef} isModal={isModal} closeModal={closeModal}>
        <AddEditTransaction
          operationType={operationType}
          closeModal={closeModal}
        />
      </Modal>
      <ul className="operation-tabs">
        <li
          onClick={() => setOperationType("expenses")}
          className={`${
            operationType === "expenses" ? "u-active-indicator" : "u-muted"
          }`}
        >
          Wydatki
        </li>

        <li
          onClick={() => setOperationType("incomes")}
          className={`${
            operationType === "incomes" ? "u-active-indicator" : "u-muted"
          }`}
        >
          Dochody
        </li>
      </ul>

      <button type="button" className="u-icon-btn" onClick={() => showModal()}>
        <i className="bi bi-plus-circle"></i>
      </button>
    </>
  );
};

export default OperationTabs;

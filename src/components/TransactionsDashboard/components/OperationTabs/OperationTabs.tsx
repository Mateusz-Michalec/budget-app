import React from "react";
import { OperationsType } from "../../TransactionsDashboard";
import useModal from "../../../ui/Modal/useModal";
import AddEditTransaction from "../../../AddTransaction/AddEditTransaction";
import "./OperationsTabs.scss";
import { useAppSelector } from "../../../../app/hooks";
import { selectAccountNames } from "../../../../features/accounts/accountsSlice";
import AddNewAccount from "../../../Navbar/components/AddNewAccount/AddNewAccount";

type OperationTabsProps = {
  operationType: OperationsType;
  setOperationType: React.Dispatch<React.SetStateAction<OperationsType>>;
};

const OperationTabs = ({
  operationType,
  setOperationType,
}: OperationTabsProps) => {
  const { Modal, closeModal, showModal } = useModal();

  const accountNames = useAppSelector(selectAccountNames);

  return (
    <>
      <Modal>
        {accountNames.length > 0 ? (
          <AddEditTransaction
            operationType={operationType}
            closeModal={closeModal}
          />
        ) : (
          <AddNewAccount closeModal={closeModal} />
        )}
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

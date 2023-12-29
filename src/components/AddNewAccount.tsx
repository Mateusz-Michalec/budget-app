import React, { useRef, useState } from "react";
import Modal from "./ui/Modal/Modal";
import AddBtn from "./ui/AddBtn";
import { useAppDispatch } from "../app/hooks";
import { addAccount } from "../features/accounts/accountsSlice";

const AddNewAccount = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState<number | string>("");

  const dispatch = useAppDispatch();

  return (
    <>
      <button
        type="button"
        onClick={() => modalRef.current?.showModal()}
        className="u-btn-with-icon"
      >
        <i className="bi bi-database-add"></i>
        <span>Dodaj konto</span>
      </button>
      <Modal ref={modalRef}>
        <div className="u-input-column">
          <label htmlFor="accountName">Nazwa konta:</label>
          <input
            placeholder="np. Bank"
            id="accountName"
            type="text"
            min={3}
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>

        <div className="u-input-column">
          <label htmlFor="accountAmount">Kwota na koncie (PLN):</label>
          <input
            id="accountAmount"
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(Number(e.target.value))}
          />
        </div>

        <AddBtn
          aria-label="Dodaj nowe konto"
          onClick={() => {
            if (typeof accountBalance === "number")
              dispatch(
                addAccount({ name: accountName, balance: accountBalance })
              );
            modalRef.current?.close();
          }}
          disabled={
            accountName.length < 3 || typeof accountBalance !== "number"
          }
        />
      </Modal>
    </>
  );
};

export default AddNewAccount;

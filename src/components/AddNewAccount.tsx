import React, { useRef, useState } from "react";
import Modal from "./ui/Modal/Modal";
import { useAppDispatch } from "../app/hooks";
import { addAccount } from "../features/accounts/accountsSlice";

type AddNewAccountProps = {
  closeModal: () => void;
};

const AddNewAccount = ({ closeModal }: AddNewAccountProps) => {
  const [accountName, setAccountName] = useState("");
  const [accountBalance, setAccountBalance] = useState<number | string>("");

  const dispatch = useAppDispatch();

  const isDataValid =
    accountName.length > 3 && typeof accountBalance === "number";

  const addNewAccount = () => {
    if (isDataValid) {
      dispatch(addAccount({ name: accountName, balance: accountBalance }));
      closeModal();
    }
  };

  return (
    <>
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
    </>
  );
};

export default AddNewAccount;

import React, { useState } from "react";

import { useAppDispatch } from "../../../../app/hooks";
import { addAccount } from "../../../../features/accounts/accountsSlice";
import "./AddNewAccout.scss";

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
    <section className="add-new-account">
      <div className="u-column-input">
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

      <div className="u-column-input ">
        <label htmlFor="accountAmount">Kwota na koncie (PLN):</label>
        <input
          id="accountAmount"
          type="number"
          value={accountBalance}
          onChange={(e) => setAccountBalance(Number(e.target.value))}
        />
      </div>

      <button
        disabled={!isDataValid}
        onClick={() => addNewAccount()}
        className={`u-btn ${isDataValid ? "" : "u-muted"}`}
      >
        Dodaj
      </button>
    </section>
  );
};

export default AddNewAccount;

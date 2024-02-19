import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addAccount,
  selectAccountById,
} from "../../features/accounts/accountsSlice";
import "./AddEditAccount.scss";
import useModal from "../ui/Modal/useModal";

type AddEditAccountProps = {
  accountIdToEdit?: string | null;
};

const AddEditAccount = ({ accountIdToEdit }: AddEditAccountProps) => {
  const accountToEdit = accountIdToEdit
    ? useAppSelector((state) => selectAccountById(state, accountIdToEdit))
    : null;

  const [accountName, setAccountName] = useState(
    accountToEdit ? accountToEdit.name : ""
  );
  const [accountBalance, setAccountBalance] = useState<number | null>(
    accountToEdit ? accountToEdit.balance : null
  );

  const { closeModal } = useModal();

  const dispatch = useAppDispatch();

  const isDataValid = accountName.length > 4 && accountBalance;

  const AddEditAccount = () => {
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
          value={accountBalance ? accountBalance : ""}
          onChange={(e) => setAccountBalance(Number(e.target.value))}
        />
      </div>

      <button
        disabled={!isDataValid}
        onClick={() => AddEditAccount()}
        className={`u-btn ${isDataValid ? "" : "u-muted"}`}
      >
        Dodaj
      </button>
    </section>
  );
};

export default AddEditAccount;

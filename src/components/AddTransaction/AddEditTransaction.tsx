import React, { useState } from "react";
import { OperationsType } from "../OperationsCard/OperationsCard";
import "./AddEditTransaction.scss";
import TransactionDescription from "./components/TransactionDescription/TransactionDescription";
import { DateUtils } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Transaction,
  addTransaction,
  getAccountIdByName,
  getDefaultAccount,
  selectAccountNames,
} from "../../features/accounts/accountsSlice";
import { DatePicker } from "../../utils/DateUtils";

type AddEditTransactionProps = {
  closeModal: () => void | null;
  operationType: OperationsType;
  transaction?: null | Omit<Transaction, "id" | "operationType">;
};

const AddEditTransaction = ({
  operationType,
  closeModal,
  transaction,
}: AddEditTransactionProps) => {
  const getInitialDate = () => {
    if (transaction) {
      const date = new Date(transaction.timestamp);
      return {
        date,
        formattedDate: date.toISOString().slice(0, 10),
      };
    } else return DateUtils.getInitialDatePickerData();
  };

  const [amount, setAmount] = useState<number | string>(
    transaction?.amount || ""
  );
  const [description, setDescription] = useState(
    transaction?.description || ""
  );
  const [icon, setIcon] = useState(transaction?.icon || "");
  const [date, setDate] = useState<DatePicker>(getInitialDate());

  const isTransactionValid =
    typeof amount === "number" && description.length > 0 && icon.length > 0;

  const accountNames = useAppSelector(selectAccountNames);
  const defaultAccount = useAppSelector(getDefaultAccount);

  const [activeAccount, setActiveAccount] = useState(defaultAccount?.name);

  const accountId = useAppSelector((state) =>
    getAccountIdByName(state, activeAccount)
  );

  const dispatch = useAppDispatch();

  return (
    <div className="transaction">
      <header>
        <h1 className="transaction__type">
          {operationType === "expenses" ? "Wydatki" : "Dochody"}
        </h1>
        <p>{transaction ? "Edycja" : "Dodawanie"} transakcji</p>
        <hr />
      </header>

      <div className="transaction__amount-wrapper">
        <input
          className="transaction__amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          id="amount"
          type="number"
        />
        <label htmlFor="amount">PLN</label>
      </div>

      <div className="transaction__accounts-wrapper">
        <label htmlFor="accounts">Konto:</label>
        <select
          defaultValue={activeAccount}
          onChange={(e) => setActiveAccount(e.target.value)}
          className="transaction__accounts"
          id="accounts"
        >
          {accountNames.map((accountName) => (
            <option key={accountName}>{accountName}</option>
          ))}
        </select>
      </div>

      <div className="transaction__date-wrapper">
        <label htmlFor="date">Data:</label>
        <input
          value={date.formattedDate}
          onChange={(e) =>
            setDate((prev) => ({
              ...prev,
              date: new Date(e.target.value),
              formattedDate: e.target.value,
            }))
          }
          type="date"
          id="date"
        />
      </div>

      <TransactionDescription
        icon={icon}
        setIcon={setIcon}
        description={description}
        setDescription={setDescription}
      />

      <button
        onClick={() => {
          if (accountId && typeof amount === "number" && !transaction) {
            dispatch(
              addTransaction({
                accountId,
                amount,
                description,
                timestamp: date.date?.getTime()!,
                icon,
                operationType,
              })
            );
            closeModal();
          }
        }}
        disabled={!isTransactionValid}
        type="button"
        className={`transaction__add-btn ${
          isTransactionValid ? "" : "u-muted"
        }`}
      >
        <span>{transaction ? "Zapisz" : "Dodaj"}</span>
      </button>
    </div>
  );
};

export default AddEditTransaction;

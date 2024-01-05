import React, { useState } from "react";
import { OperationsType } from "../OperationsCard/OperationsCard";
import "./AddEditTransaction.scss";
import TransactionDescription from "./components/TransactionDescription/TransactionDescription";
import { DateUtils } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Transaction,
  addTransaction,
  editTransaction,
  getAccountIdByName,
  getDefaultAccount,
  selectAccountNames,
} from "../../features/accounts/accountsSlice";
import { DatePicker } from "../../utils/DateUtils";

type AddEditTransactionProps = {
  closeModal: () => void | null;
  operationType: OperationsType;
  transaction?: null | Transaction;
};

const AddEditTransaction = ({
  operationType,
  closeModal,
  transaction,
}: AddEditTransactionProps) => {
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState<number | string>(
    transaction?.amount || ""
  );
  const [description, setDescription] = useState(
    transaction?.description || ""
  );
  const [category, setCategory] = useState(transaction?.category || "");
  const [date, setDate] = useState<DatePicker>(
    DateUtils.getInitialDatePickerData(transaction?.timestamp)
  );

  const isTransactionValid =
    typeof amount === "number" && description.length > 0 && category.length > 0;

  const accountNames = useAppSelector(selectAccountNames);

  const defaultAccount = useAppSelector(getDefaultAccount);
  const [activeAccount, setActiveAccount] = useState(defaultAccount?.name);
  const accountId = useAppSelector((state) =>
    getAccountIdByName(state, activeAccount)
  );

  return (
    <div className="add-edit-transaction">
      <header>
        <h2 className="add-edit-transaction__type">
          {operationType === "expenses" ? "Wydatki" : "Dochody"}
        </h2>
        <p>{transaction ? "Edycja" : "Dodawanie"} transakcji</p>
        <hr />
      </header>

      <div className="u-row-input add-edit-transaction__amount-group">
        <input
          className="add-edit-transaction__amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          id="amount"
          type="number"
        />
        <label htmlFor="amount">PLN</label>
      </div>

      <div className="u-column-input">
        <label htmlFor="accounts">Konto:</label>
        <select
          defaultValue={activeAccount}
          onChange={(e) => setActiveAccount(e.target.value)}
          className="add-edit-transaction__accounts"
          id="accounts"
        >
          {accountNames.map((accountName) => (
            <option key={accountName}>{accountName}</option>
          ))}
        </select>
      </div>

      <div className="u-column-input">
        <label htmlFor="date">Data:</label>
        <input
          className="add-edit-transaction__date"
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
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
      />

      <button
        onClick={() => {
          if (accountId && typeof amount === "number") {
            if (!transaction)
              dispatch(
                addTransaction({
                  accountId,
                  amount,
                  description,
                  timestamp: date.date?.getTime()!,
                  category,
                  operationType,
                })
              );
            else
              dispatch(
                editTransaction({
                  ...transaction,
                  accountId,
                  amount,
                  description,
                  timestamp: date.date?.getTime()!,
                  category,
                  operationType,
                })
              );
          }
          closeModal();
        }}
        disabled={!isTransactionValid}
        type="button"
        className={`u-btn ${isTransactionValid ? "" : "u-muted"}`}
      >
        {transaction ? "Zapisz" : "Dodaj"}
      </button>
    </div>
  );
};

export default AddEditTransaction;

import React, { useState } from "react";
import { OperationsType } from "../OperationsCard/OperationsCard";
import "./AddTransaction.scss";
import TransactionDescription from "./components/TransactionDescription/TransactionDescription";
import { DateUtils } from "../../utils";
import { DateWithFormat } from "../../utils/DateUtils";

const AddTransaction = ({ type }: OperationsType) => {
  const todayDate = new Date();

  const [amount, setAmount] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [date, setDate] = useState<DateWithFormat>(
    DateUtils.getTodayPickerDate()
  );

  return (
    <div className="transaction">
      <header>
        <h1 className="transaction__type">
          {type === "expenses" ? "Wydatki" : "Dochody"}
        </h1>
        <p>Dodawanie transakcji</p>
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
        <select className="transaction__accounts" id="accounts">
          <option>Bank</option>
          <option>Skarbonka</option>
        </select>
      </div>

      <div className="transaction__date-wrapper">
        <label htmlFor="date">Data:</label>
        <input
          value={date.formattedDate}
          onChange={(e) =>
            setDate({
              date: new Date(e.target.value),
              formattedDate: e.target.value,
            })
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

      <button type="button" className="transaction__add-btn">
        <i className="bi bi-plus"></i>
        <span>Dodaj</span>
      </button>
    </div>
  );
};

export default AddTransaction;

import React, { useState } from "react";
import { OperationsType } from "../OperationsCard/OperationsCard";
import "./AddTransaction.scss";
import TransactionIcons from "./components/TransactionIcons/TransactionIcons";

const AddTransaction = ({ type }: OperationsType) => {
  const [amount, setAmount] = useState(0);
  const [icon, setIcon] = useState("");

  return (
    <div className="transaction">
      <header>
        <h1 className="transaction__type">
          {type === "expenses" ? "Wydatki" : "Dochody"}
        </h1>
        <p>Dodawanie transakcji</p>
        <hr />
      </header>
      <section>
        <div className="transaction__amount">
          <input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            id="amount"
            type="number"
          />
          <label htmlFor="amount">PLN</label>
        </div>
        <div className="transaction__accounts">
          <label htmlFor="accounts">Konto:</label>
          <select id="accounts">
            <option>Bank</option>
            <option>Skarbonka</option>
          </select>
        </div>
      </section>
      <TransactionIcons icon={icon} setIcon={setIcon} />
    </div>
  );
};

export default AddTransaction;

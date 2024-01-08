import React from "react";
import "./TransactionDescription.scss";
import { TransactionsUtils } from "../../../../utils";

type TransactionDescriptionProps = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
};

const TransactionDescription = ({
  category,
  setCategory,
  description,
  setDescription,
}: TransactionDescriptionProps) => {
  return (
    <section className="add-edit-transaction__description">
      <header>
        <h3 className="add-edit-transaction__header">
          Kategoria i opis transakcji
        </h3>
        <hr />
      </header>
      <div className="add-edit-transaction__icons">
        {Object.entries(TransactionsUtils.categories).map(([cat, icon]) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            type="button"
            style={{ backgroundColor: icon.bgColor }}
            className={`add-edit-transaction__icon u-icon-circle ${
              category === cat
                ? "add-edit-transaction__icon--active"
                : "u-muted"
            }`}
            aria-label="Wybierz kategorię"
          >
            <i className={`bi bi-${icon.icon}`}></i>
            <p className="add-edit-transaction__category">{cat}</p>
          </button>
        ))}
      </div>
      <div className="u-row-input">
        <label htmlFor="description">Opis:</label>
        <input
          className="add-edit-transaction__desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          type="text"
          maxLength={50}
        />
      </div>
    </section>
  );
};

export default TransactionDescription;

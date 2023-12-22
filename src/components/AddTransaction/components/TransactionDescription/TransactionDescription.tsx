import React from "react";
import "./TransactionDescription.scss";

type TransactionDescriptionProps = {
  icon: string;
  setIcon: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
};

const TransactionDescription = ({
  icon,
  setIcon,
  description,
  setDescription,
}: TransactionDescriptionProps) => {
  const icons = ["bag", "cart", "cash-coin"];

  return (
    <section className="transaction__description">
      <header>
        <h3>Ikona</h3>
        <hr />
      </header>
      <div className="transaction__icons">
        {icons.map((i) => (
          <button
            key={i}
            onClick={() => setIcon(i)}
            type="button"
            className={`transaction__icon ${
              icon === i ? "transaction__icon--active" : "u-muted"
            }`}
            aria-label="Wybierz ikonę"
          >
            <i className={`bi bi-${i}`}></i>
          </button>
        ))}
      </div>
      <div className="transaction__brief-desc">
        <label htmlFor="description">Opis transakcji:</label>
        <input
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

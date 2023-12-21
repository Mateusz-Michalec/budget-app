import React from "react";
import "./TransactionIcons.scss";

type TransactionIconsProps = {
  icon: string;
  setIcon: React.Dispatch<React.SetStateAction<string>>;
};

const TransactionIcons = ({ icon, setIcon }: TransactionIconsProps) => {
  const icons = ["bag", "cart", "cash-coin"];

  return (
    <section className="transaction__icons-wrapper">
      <header>
        <h3>Ikona</h3>
        <hr />
      </header>
      <div className="transaction__icons">
        {icons.map((i) => (
          <button
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
    </section>
  );
};

export default TransactionIcons;

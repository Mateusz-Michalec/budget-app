import React from "react";
import { useAppSelector } from "../../app/hooks";
import {
  Transaction,
  getDefaultAccount,
} from "../../features/accounts/accountsSlice";
import "./TransacionList.scss";
import { OperationsType } from "../OperationsCard/OperationsCard";

type TransactionListProps = {
  operationType: OperationsType;
  transactions: Transaction[] | undefined;
};

type TransactionGroups = Record<string, Transaction[]>;

const TransacionList = ({
  transactions,
  operationType,
}: TransactionListProps) => {
  const transactionsSum = transactions?.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const groupedTransactions = transactions?.reduce(
    (groups: TransactionGroups, transaction) => {
      const date = new Date(transaction.timestamp).toLocaleDateString();

      if (!groups[date]) groups[date] = [];

      groups[date].push(transaction);

      return groups;
    },
    {}
  );

  return (
    <>
      {groupedTransactions ? (
        <section className="transactions">
          <div className="transactions__sum">Suma: {transactionsSum} PLN</div>

          {Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date} className="transactions__group">
              <p>{date}</p>
              {transactions.map((transaction) => (
                <div className="transactions__transaction" key={transaction.id}>
                  <i
                    className={`bi transactions__transaction-icon bi-${transaction.icon}`}
                  ></i>
                  <span> {transaction.description}</span>

                  <div>
                    <span>{operationType === "expenses" ? "▼ " : "▲ "}</span>
                    <span>{transaction.amount} PLN</span>
                  </div>

                  <button
                    className="transactions__delete-btn"
                    aria-label="usuń transakcję"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              ))}
            </div>
          ))}
        </section>
      ) : null}
    </>
  );
};

export default TransacionList;

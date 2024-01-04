import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  Transaction,
  deleteTransaction,
} from "../../features/accounts/accountsSlice";
import "./TransacionList.scss";
import { OperationsType } from "../OperationsCard/OperationsCard";
import Modal from "../ui/Modal/Modal";
import AddEditTransaction from "../AddTransaction/AddEditTransaction";
import useModal from "../../hooks/useModal";

type TransactionListProps = {
  operationType: OperationsType;
  transactions: Transaction[] | undefined;
};

type TransactionGroups = Record<string, Transaction[]>;

const TransacionList = ({
  transactions,
  operationType,
}: TransactionListProps) => {
  const dispatch = useAppDispatch();

  const { modalRef, isModal, closeModal, showModal } = useModal();

  const [transactionToEdit, setTransactionToEdit] = useState<null | Omit<
    Transaction,
    "id" | "operationType"
  >>(null);

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
      <Modal ref={modalRef} isModal={isModal} closeModal={closeModal}>
        <AddEditTransaction
          transaction={transactionToEdit}
          operationType={operationType}
          closeModal={closeModal}
        />
      </Modal>

      {groupedTransactions ? (
        <section className="transactions">
          <p className="transactions__sum">Suma: {transactionsSum} PLN</p>

          {Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date} className="transactions__group">
              <p className="transactions__date">{date}</p>
              {transactions.map((transaction) => {
                const {
                  accountId,
                  amount,
                  description,
                  id,
                  icon,
                  operationType,
                } = transaction;
                return (
                  <div className="transactions__transaction" key={id}>
                    <i
                      className={`bi transactions__transaction-icon bi-${icon}`}
                    ></i>
                    <span> {description}</span>

                    <span className="transactions__amount">
                      {operationType === "expenses" ? "▼ " : "▲ "}
                      {amount} PLN
                    </span>

                    <button
                      onClick={() => {
                        showModal();
                        setTransactionToEdit({
                          accountId,
                          amount,
                          description,
                          icon,
                          timestamp: transaction.timestamp,
                        });
                      }}
                      className="transactions__manipulate-btn"
                      aria-label="edytuj transakcję"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>

                    <button
                      onClick={() =>
                        dispatch(
                          deleteTransaction({ id, accountId, operationType })
                        )
                      }
                      className="transactions__manipulate-btn"
                      aria-label="usuń transakcję"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </section>
      ) : (
        <p className="transactions__sum">Brak transakcji</p>
      )}
    </>
  );
};

export default TransacionList;

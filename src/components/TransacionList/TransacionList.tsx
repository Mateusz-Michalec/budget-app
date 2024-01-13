import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  FilteredTransactions,
  Transaction,
  deleteTransaction,
} from "../../features/accounts/accountsSlice";
import "./TransacionList.scss";
import { OperationsType } from "../TransactionsDashboard/TransactionsDashboard";
import Modal from "../ui/Modal/Modal";
import AddEditTransaction from "../AddTransaction/AddEditTransaction";
import useModal from "../../hooks/useModal";
import { TransactionsUtils } from "../../utils";
import CategoriesChart from "./components/CategoriesChart/CategoriesChart";
import CategoriesStats from "./components/CategoriesChart/CategoriesStats/CategoriesStats";

type TransactionListProps = {
  operationType: OperationsType;
  transactions: FilteredTransactions;
};

const TransacionList = ({
  transactions,
  operationType,
}: TransactionListProps) => {
  const dispatch = useAppDispatch();

  const { modalRef, isModal, closeModal, showModal } = useModal();

  const [transactionToEdit, setTransactionToEdit] =
    useState<null | Transaction>(null);

  const selectedOperationTransactions = transactions[operationType];
  const oppositeOperationType: OperationsType =
    operationType === "expenses" ? "incomes" : "expenses";

  const categoriesTotalAmount = TransactionsUtils.getCategoriesTotalAmount(
    selectedOperationTransactions!
  );

  const groupedTransactions = TransactionsUtils.getGroupedTransactions(
    selectedOperationTransactions!
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

      {selectedOperationTransactions ? (
        <section className="transactions">
          <CategoriesChart categoriesTotalAmount={categoriesTotalAmount} />
          <CategoriesStats categoriesTotalAmount={categoriesTotalAmount} />

          {Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date} className="transactions__group">
              <p className="transactions__date">{date}</p>
              {transactions.map((transaction) => {
                const {
                  accountId,
                  amount,
                  description,
                  id,
                  category,
                  operationType,
                } = transaction;

                const icon = TransactionsUtils.getTransactionIcon(category);

                return (
                  <div className="transactions__transaction" key={id}>
                    <span
                      style={{ backgroundColor: icon.bgColor }}
                      className="u-icon-circle"
                    >
                      <i className={`bi bi-${icon.icon}`}></i>
                    </span>
                    <div className="transactions__transaction-details">
                      <span>{description}</span>

                      <span className="transactions__amount">{amount} PLN</span>
                    </div>

                    <div className="transactions__manipulate-btns">
                      <button
                        onClick={() => {
                          showModal();
                          setTransactionToEdit(transaction);
                        }}
                        className="transactions__manipulate-btn u-muted"
                        aria-label="edytuj transakcję"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        onClick={() =>
                          dispatch(
                            deleteTransaction({
                              id,
                              accountId,
                              operationType,
                              amount,
                            })
                          )
                        }
                        className="transactions__manipulate-btn u-muted"
                        aria-label="usuń transakcję"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
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

import React, { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import {
  Transaction,
  deleteTransaction,
} from "../../../../features/accounts/accountsSlice";
import "./TransacionList.scss";
import { OperationsType } from "../../TransactionsDashboard";
import AddEditTransaction from "../../../AddTransaction/AddEditTransaction";
import useModal from "../../../ui/Modal/useModal";
import { TransactionsUtils } from "../../../../utils";
import CategoryIcon from "../../../ui/CategoryIcon";

type TransactionListProps = {
  operationTransactions: Transaction[];
  operationType: OperationsType;
};

const TransacionList = ({
  operationTransactions,
  operationType,
}: TransactionListProps) => {
  const dispatch = useAppDispatch();

  const { Modal, showModal } = useModal();

  const [transactionToEdit, setTransactionToEdit] =
    useState<null | Transaction>(null);

  const groupedTransactions = TransactionsUtils.getGroupedTransactions(
    operationTransactions
  );

  return (
    <>
      <Modal>
        <AddEditTransaction
          transaction={transactionToEdit}
          operationType={operationType}
        />
      </Modal>

      <section className="transactions">
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <div key={date} className="transactions__transaction-group">
            <p className="transactions__transaction-group-date">{date}</p>
            {transactions.map((transaction) => {
              const {
                accountId,
                amount,
                description,
                id,
                category,
                operationType,
              } = transaction;

              return (
                <div className="transactions__transaction" key={id}>
                  <CategoryIcon category={category} />
                  <div className="transactions__transaction-panel">
                    <span>{description}</span>
                    <span className="transactions__transaction-amount">
                      {amount} PLN
                    </span>
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
    </>
  );
};

export default TransacionList;

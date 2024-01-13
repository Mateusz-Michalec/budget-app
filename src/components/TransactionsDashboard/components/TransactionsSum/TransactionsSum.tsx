import React from "react";
import "./TransactionsSum.scss";
import { FilteredTransactions } from "../../../../features/accounts/accountsSlice";
import { TransactionsUtils } from "../../../../utils";
import { OperationsType } from "../../TransactionsDashboard";

type TransactionsSumProps = {
  transactions: FilteredTransactions;
  operationType: OperationsType;
};

const TransactionsSum = ({
  transactions,
  operationType,
}: TransactionsSumProps) => {
  const transactionsSum = TransactionsUtils.getTransactionsSum(transactions);

  return (
    <div className="transactions-sum">
      <p>Suma: {transactionsSum[operationType]} PLN</p>
      {TransactionsUtils.getTransactionsSumDifference(transactionsSum)}
    </div>
  );
};

export default TransactionsSum;

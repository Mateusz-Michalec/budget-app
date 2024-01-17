import React, { useState } from "react";
import PeriodTabs, { Period } from "./components/PeriodTabs/PeriodTabs";
import { DateUtils, TransactionsUtils } from "../../utils";
import { useAppSelector } from "../../app/hooks";
import {
  getDefaultAccountName,
  selectTransactions,
} from "../../features/accounts/accountsSlice";
import PeriodDate from "./components/PeriodDate/PeriodDate";
import { PeriodTab } from "../../utils/DateUtils";
import TransacionList from "./components/TransacionList/TransacionList";
import OperationTabs from "./components/OperationTabs/OperationTabs";
import TransactionsSum from "./components/TransactionsSum/TransactionsSum";
import CategoriesChart from "./components/CategoriesChart/CategoriesChart";
import CategoriesAmount from "./components/CategoriesAmount/CategoriesAmount";

export type OperationsType = "expenses" | "incomes";

const TransactionsDashboard = () => {
  const [operationType, setOperationType] =
    useState<OperationsType>("expenses");

  const [currentPeriod, setCurrentPeriod] = useState<Period>("Tydzień");

  const [date, setDate] = useState<PeriodTab>(
    DateUtils.getInitialPeriodTabData(currentPeriod)
  );

  const activeAccount = useAppSelector(getDefaultAccountName);

  const transactions = useAppSelector((state) =>
    selectTransactions(state, {
      accountName: activeAccount,
      period: currentPeriod,
      timestamp: date.transactionsTimestamp,
    })
  );

  const operationTransactions = transactions
    ? transactions[operationType]
    : null;

  const categoriesTotalAmount = operationTransactions
    ? TransactionsUtils.getCategoriesTotalAmount(operationTransactions)
    : null;

  return (
    <>
      <div className="u-sticky">
        <OperationTabs
          operationType={operationType}
          setOperationType={setOperationType}
        />
        <PeriodTabs
          setDate={setDate}
          currentPeriod={currentPeriod}
          setCurrentPeriod={setCurrentPeriod}
        />
        <PeriodDate
          date={date}
          setDate={setDate}
          currentPeriod={currentPeriod}
        />
      </div>

      {operationTransactions && operationTransactions?.length > 0 ? (
        <>
          <TransactionsSum
            transactions={transactions!}
            operationType={operationType}
          />
          <CategoriesChart categoriesTotalAmount={categoriesTotalAmount!} />
          <CategoriesAmount categoriesTotalAmount={categoriesTotalAmount!} />
          <TransacionList
            operationType={operationType}
            operationTransactions={operationTransactions}
          />
        </>
      ) : (
        <p className="u-text-muted-center">Brak transakcji</p>
      )}
    </>
  );
};

export default TransactionsDashboard;

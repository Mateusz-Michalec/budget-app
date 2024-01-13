import React, { useEffect, useRef, useState } from "react";
import PeriodTabs, { Period } from "./components/PeriodTabs/PeriodTabs";
import { DateUtils } from "../../utils";
import { useAppSelector } from "../../app/hooks";
import {
  getDefaultAccount,
  selectTransactions,
} from "../../features/accounts/accountsSlice";
import PeriodDate from "./components/PeriodDate/PeriodDate";
import { PeriodTab } from "../../utils/DateUtils";
import TransacionList from "../TransacionList/TransacionList";
import OperationTabs from "./components/OperationTabs/OperationTabs";
import TransactionsSum from "./components/TransactionsSum/TransactionsSum";

export type OperationsType = "expenses" | "incomes";

const TransactionsDashboard = () => {
  const [operationType, setOperationType] =
    useState<OperationsType>("expenses");

  const [currentPeriod, setCurrentPeriod] = useState<Period>("Tydzień");

  const [date, setDate] = useState<PeriodTab>(
    DateUtils.getInitialPeriodTabData(currentPeriod)
  );

  // Transactions
  const activeAccountName = useAppSelector(getDefaultAccount)?.name;

  const transactions = useAppSelector((state) => {
    if (date.transactionsTimestamp)
      return selectTransactions(state, {
        accountName: activeAccountName!,
        period: currentPeriod,
        timestamp: date.transactionsTimestamp,
      });
  });

  const isTransactions = transactions && transactions[operationType];

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

      {isTransactions ? (
        <TransactionsSum
          transactions={transactions}
          operationType={operationType}
        />
      ) : null}

      {transactions && transactions[operationType] ? (
        <TransacionList
          operationType={operationType}
          transactions={transactions}
        />
      ) : null}
    </>
  );
};

export default TransactionsDashboard;

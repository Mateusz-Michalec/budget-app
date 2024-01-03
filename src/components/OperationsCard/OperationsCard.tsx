import React, { useEffect, useRef, useState } from "react";
import "./OperationsCard.scss";
import PeriodTabs, { Period } from "./components/PeriodTabs/PeriodTabs";
import "./OperationsCard.scss";
import ContentCard from "../ui/ContentCard";
import AddBtn from "../ui/AddBtn";
import Modal from "../ui/Modal/Modal";
import AddTransaction from "../AddTransaction/AddTransaction";
import { DateUtils } from "../../utils";
import { useAppSelector } from "../../app/hooks";
import {
  getDefaultAccount,
  selectTransactions,
} from "../../features/accounts/accountsSlice";

import PeriodDate from "./components/PeriodDate/PeriodDate";
import { PeriodTab } from "../../utils/DateUtils";
import TransacionList from "../TransacionList/TransacionList";

export type OperationsType = "expenses" | "incomes";

const OperationsCard = ({
  operationType,
}: {
  operationType: OperationsType;
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [currentPeriod, setCurrentPeriod] = useState<Period>("Tydzień");

  const [date, setDate] = useState<PeriodTab>(
    DateUtils.getInitialPeriodTabData(currentPeriod)
  );

  useEffect(() => {
    setDate(DateUtils.getInitialPeriodTabData(currentPeriod));
  }, [currentPeriod]);

  console.log(date);

  // Transactions
  const activeAccountName = useAppSelector(getDefaultAccount)?.name;

  const transactions = useAppSelector((state) => {
    if (date.transactionsTimestamp)
      return selectTransactions(state, {
        accountName: activeAccountName!,
        timestamp: date.transactionsTimestamp,
        operationType,
      });
  });

  const isAddBtnDisabled =
    currentPeriod === "Zakres" && date.date === null && date.nextDate === null;

  const onAddTransaction = () =>
    modalRef.current ? modalRef.current.close() : null;

  return (
    <ContentCard>
      <PeriodTabs
        currentPeriod={currentPeriod}
        setCurrentPeriod={setCurrentPeriod}
      />
      <PeriodDate date={date} setDate={setDate} currentPeriod={currentPeriod} />
      {}
      <TransacionList
        operationType={operationType}
        transactions={transactions}
      />
      <AddBtn
        disabled={isAddBtnDisabled}
        onClick={() => (modalRef.current ? modalRef.current.showModal() : null)}
      />

      <Modal ref={modalRef}>
        <AddTransaction
          operationType={operationType}
          onAddTransaction={onAddTransaction}
        />
      </Modal>
    </ContentCard>
  );
};

export default OperationsCard;

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
  Transaction,
  getDefaultAccount,
  selectTransactions,
} from "../../features/accounts/accountsSlice";
import { DatePicker } from "../../utils/DateUtils";
import PeriodDate from "./components/PeriodDate/PeriodDate";
import SingleTransaction from "../SingleTransaction/Transaction";

export type OperationsType = "expenses" | "incomes";

const OperationsCard = ({ type }: { type: OperationsType }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [currentPeriod, setCurrentPeriod] = useState<Period>("Tydzień");

  const [date, setDate] = useState<DatePicker>(
    DateUtils.getInitialPickerData(currentPeriod)
  );

  // Transactions
  const activeAccountName = useAppSelector(getDefaultAccount)?.name;

  const timestamp =
    currentPeriod === "Dzień"
      ? date.date?.getTime()
      : [date.date?.getTime(), date.nextDate?.getTime()];

  const transactions = useAppSelector((state) =>
    selectTransactions(state, {
      accountName: activeAccountName!,
      timestampRange: timestamp as [number, number],
      type,
    })
  );
  //

  const isAddBtnDisabled = currentPeriod === "Okres" && date.nextDate === null;

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
      <SingleTransaction />
      <AddBtn
        disabled={isAddBtnDisabled}
        onClick={() => (modalRef.current ? modalRef.current.showModal() : null)}
      />

      <Modal ref={modalRef}>
        <AddTransaction type={type} onAddTransaction={onAddTransaction} />
      </Modal>
    </ContentCard>
  );
};

export default OperationsCard;

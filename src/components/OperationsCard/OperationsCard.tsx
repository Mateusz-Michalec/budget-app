import React, { useRef, useState } from "react";
import "./OperationsCard.scss";
import PeriodTabs, { Period } from "./components/PeriodTabs/PeriodTabs";
import "./OperationsCard.scss";
import PeriodDate, {
  ControlledDate,
  ExtendedControlledDate,
} from "./components/PeriodDate/PeriodDate";
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

export type OperationsType = {
  type: "expenses" | "incomes";
};

const OperationsCard = ({ type }: OperationsType) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [currentPeriod, setCurrentPeriod] = useState<Period>("Tydzień");

  // Variables for date picker
  const [date, setDate] = useState<ExtendedControlledDate>({
    date: undefined,
    formattedDate: "",
  });

  const [nextDate, setNextDate] = useState<ControlledDate>({
    date: undefined,
    formattedDate: "",
  });
  //

  const activeAccountName = useAppSelector(getDefaultAccount)?.name;
  let transactions: Transaction[] = [];

  switch (currentPeriod) {
    case "Tydzień":
      transactions = useAppSelector((state) =>
        selectTransactions(state, {
          accountName: activeAccountName,
          timestampRange: [date.date?.getTime(), date.nextDate?.getTime()],
          type,
        })
      );
  }
  // const transactions = useAppSelector(state=> selectTransactions(state, activeAccountName, [] ))

  console.log(date, nextDate);

  const isAddBtnDisabled =
    date.date === undefined
      ? true
      : currentPeriod === "Okres" && nextDate.date === undefined
      ? true
      : false;

  const onAddTransaction = () =>
    modalRef.current ? modalRef.current.close() : null;

  return (
    <ContentCard>
      <PeriodTabs
        currentPeriod={currentPeriod}
        setCurrentPeriod={setCurrentPeriod}
      />
      <PeriodDate
        dates={{
          date: date,
          setDate: setDate,
          nextDate: nextDate,
          setNextDate: setNextDate,
        }}
        currentPeriod={currentPeriod}
      />
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

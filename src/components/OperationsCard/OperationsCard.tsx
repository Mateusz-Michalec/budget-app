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

export type OperationsType = {
  type: "expenses" | "incomes";
};

const OperationsCard = ({ type }: OperationsType) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [currentPeriod, setCurrentPeriod] = useState<Period>("Tydzień");

  const [date, setDate] = useState<ExtendedControlledDate>({
    date: undefined,
    formattedDate: "",
  });

  const [nextDate, setNextDate] = useState<ControlledDate>({
    date: undefined,
    formattedDate: "",
  });

  const isAddBtnDisabled =
    date.date === undefined
      ? true
      : currentPeriod === "Okres" && nextDate.date === undefined
      ? true
      : false;

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
        <AddTransaction type={type} />
      </Modal>
    </ContentCard>
  );
};

export default OperationsCard;

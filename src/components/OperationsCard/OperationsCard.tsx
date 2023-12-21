import React, { useState } from "react";
import "./OperationsCard.scss";
import PeriodTabs, { Period } from "./components/PeriodTabs/PeriodTabs";
import "./OperationsCard.scss";
import PeriodDate from "./components/PeriodDate/PeriodDate";

type OperationsCardProps = {
  type: "expenses" | "incomes";
};

const OperationsCard = ({ type }: OperationsCardProps) => {
  const [currentPeriod, setCurrentPeriod] = useState<Period>("Tydzień");

  return (
    <div className="operations-card">
      <PeriodTabs
        currentPeriod={currentPeriod}
        setCurrentPeriod={setCurrentPeriod}
      />
      <PeriodDate currentPeriod={currentPeriod} />
    </div>
  );
};

export default OperationsCard;

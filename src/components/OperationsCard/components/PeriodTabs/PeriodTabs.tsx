import React from "react";
import "./PeriodTabs.scss";
import DateUtils, { PeriodTab } from "../../../../utils/DateUtils";

const periods = ["Dzień", "Tydzień", "Miesiąc", "Rok", "Zakres"] as const;

export type Period = (typeof periods)[number];

type PeriodTabsProps = {
  currentPeriod: Period;
  setCurrentPeriod: React.Dispatch<React.SetStateAction<Period>>;
  setDate: React.Dispatch<React.SetStateAction<PeriodTab>>;
};

const PeriodTabs = ({
  setDate,
  currentPeriod,
  setCurrentPeriod,
}: PeriodTabsProps) => {
  return (
    <nav className="period-tabs">
      <ul>
        {periods.map((period) => (
          <li
            tabIndex={0}
            key={period}
            onClick={(e) => {
              const textContent = e.currentTarget.textContent;
              if (textContent !== null) {
                setCurrentPeriod(textContent as Period);
                setDate(
                  DateUtils.getInitialPeriodTabData(textContent as Period)
                );
              }
            }}
            className={`${
              period === currentPeriod ? "u-active-indicator" : "u-muted"
            }`}
          >
            {period}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PeriodTabs;

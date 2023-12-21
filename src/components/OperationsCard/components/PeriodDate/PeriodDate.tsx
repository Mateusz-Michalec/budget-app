import React, { FormEvent, useEffect, useState } from "react";
import { Period } from "../PeriodTabs/PeriodTabs";
import { DateUtils } from "../../../../utils";
import "./PeriodDate.scss";
import { DateUtilsType } from "../../../../utils/DateUtils";

export type ControlledDate = {
  date: Date | undefined;
  formattedDate: string;
};

export type ExtendedControlledDate = Partial<Omit<DateUtilsType, "date">> &
  ControlledDate;

type PeriodDateProps = {
  dates: {
    date: ExtendedControlledDate;
    setDate: React.Dispatch<React.SetStateAction<ExtendedControlledDate>>;
    nextDate: ControlledDate;
    setNextDate: React.Dispatch<React.SetStateAction<ControlledDate>>;
  };
  currentPeriod: Period;
};

const PeriodDate = ({ dates, currentPeriod }: PeriodDateProps) => {
  const getInitialDate = () => {
    switch (currentPeriod) {
      case "Dzień":
        return DateUtils.getTodayDate();

      case "Miesiąc":
        return DateUtils.getCurrentMonth();

      case "Rok":
        return DateUtils.getCurrentYear();

      case "Okres":
        return {
          date: undefined,
          formattedDate: "",
        };

      default:
        return DateUtils.getNextWeek();
    }
  };

  useEffect(() => {
    dates.setDate(getInitialDate());
    dates.setNextDate(getInitialDate());
  }, [currentPeriod]);

  return (
    <header className="period-date">
      {currentPeriod === "Okres" ? (
        <div className="period-date__inputs">
          <div className="period-date__picker">
            <label htmlFor="fromDate">Od: </label>
            <input
              onChange={(e) =>
                dates.setDate({
                  date: new Date(e.target.value),
                  formattedDate: e.target.value,
                })
              }
              value={dates.date.formattedDate}
              type="date"
              id="fromDate"
            />
          </div>

          <div className="period-date__picker">
            <label htmlFor="toDate">Do: </label>
            <input
              onChange={(e) =>
                dates.setNextDate({
                  date: new Date(e.target.value),
                  formattedDate: e.target.value,
                })
              }
              value={dates.nextDate.formattedDate}
              type="date"
              id="toDate"
              min={dates.date.formattedDate}
            />
          </div>
        </div>
      ) : (
        <h1>{dates.date?.formattedDate}</h1>
      )}
    </header>
  );
};

export default PeriodDate;

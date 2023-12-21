import React, { FormEvent, useEffect, useState } from "react";
import { Period } from "../PeriodTabs/PeriodTabs";
import { DateUtils } from "../../../../utils";
import "./PeriodDate.scss";
import { DateUtilsType } from "../../../../utils/DateUtils";

type PeriodDateProps = {
  currentPeriod: Period;
};

type ControlledDate = {
  date: Date | undefined;
  formattedDate: string;
};

type ExtendedControlledDate = Partial<Omit<DateUtilsType, "date">> &
  ControlledDate;

const PeriodDate = ({ currentPeriod }: PeriodDateProps) => {
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

  const [date, setDate] = useState<ExtendedControlledDate>({
    date: undefined,
    formattedDate: "",
  });

  const [nextDate, setNextDate] = useState<ControlledDate>({
    date: undefined,
    formattedDate: "",
  });

  useEffect(() => {
    setDate(getInitialDate());
    setNextDate(getInitialDate());
  }, [currentPeriod]);

  return (
    <header className="period-date">
      {currentPeriod === "Okres" ? (
        <div className="period-date__inputs">
          <div className="period-date__picker">
            <label htmlFor="fromDate">Od: </label>
            <input
              onChange={(e) =>
                setDate({
                  date: new Date(e.target.value),
                  formattedDate: e.target.value,
                })
              }
              value={date.formattedDate}
              type="date"
              id="fromDate"
            />
          </div>

          <div className="period-date__picker">
            <label htmlFor="toDate">Do: </label>
            <input
              onChange={(e) =>
                setNextDate({
                  date: new Date(e.target.value),
                  formattedDate: e.target.value,
                })
              }
              value={nextDate.formattedDate}
              type="date"
              id="toDate"
              min={date.formattedDate}
            />
          </div>
        </div>
      ) : (
        <h1>{date?.formattedDate}</h1>
      )}
    </header>
  );
};

export default PeriodDate;

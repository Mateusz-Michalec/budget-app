import React, { useEffect } from "react";
import { Period } from "../PeriodTabs/PeriodTabs";
import "./PeriodDate.scss";
import DateUtils, { DatePicker } from "../../../../utils/DateUtils";

type PeriodDateProps = {
  date: DatePicker;
  setDate: React.Dispatch<React.SetStateAction<DatePicker>>;
  currentPeriod: Period;
};

const PeriodDate = ({ date, setDate, currentPeriod }: PeriodDateProps) => {
  useEffect(() => {
    setDate(DateUtils.getInitialPickerData(currentPeriod));
  }, [currentPeriod]);

  return (
    <header className="period-date">
      {currentPeriod === "Okres" ? (
        <div className="period-date__inputs">
          <div className="period-date__picker">
            <label htmlFor="fromDate">Od: </label>
            <input
              onChange={(e) =>
                setDate((prev) => ({
                  ...prev,
                  date: new Date(e.target.value),
                  formattedDate: e.target.value,
                }))
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
                setDate((prev) => ({
                  ...prev,
                  nextDate: new Date(e.target.value),
                  formattedNextDate: e.target.value,
                }))
              }
              value={date.formattedNextDate}
              type="date"
              id="toDate"
              min={date.formattedDate}
            />
          </div>
        </div>
      ) : (
        <h1>{DateUtils.getFormatedDateByPeriod(currentPeriod)}</h1>
      )}
    </header>
  );
};

export default PeriodDate;

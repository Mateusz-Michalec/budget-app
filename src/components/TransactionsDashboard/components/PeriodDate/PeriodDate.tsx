import React, { useEffect, useRef } from "react";
import { Period } from "../PeriodTabs/PeriodTabs";
import "./PeriodDate.scss";
import { PeriodTab } from "../../../../utils/DateUtils";

type PeriodDateProps = {
  date: PeriodTab;
  setDate: React.Dispatch<React.SetStateAction<PeriodTab>>;
  currentPeriod: Period;
};

const PeriodDate = ({ date, setDate, currentPeriod }: PeriodDateProps) => {
  return (
    <header className="period-date">
      {currentPeriod === "Zakres" ? (
        <>
          {date.transactionsTimestamp ? null : <h1>{date.label}</h1>}
          <div className="period-date__inputs">
            <div className="u-row-input">
              <label htmlFor="fromDate">Od: </label>
              <input
                onChange={(e) =>
                  setDate((prev) => ({
                    ...prev,
                    date: new Date(e.target.value),
                    formattedDate: e.target.value,
                  }))
                }
                className="period-date__date-picker"
                value={date.formattedDate || ""}
                type="date"
                id="fromDate"
              />
            </div>

            <div className="u-row-input">
              <label htmlFor="toDate">Do: </label>
              <input
                onChange={(e) =>
                  setDate((prev) => {
                    const newDate = new Date(e.target.value);
                    return {
                      ...prev,
                      nextDate: newDate,
                      formattedNextDate: e.target.value,
                      transactionsTimestamp: [
                        date.date?.getTime()!,
                        newDate.getTime(),
                      ],
                    };
                  })
                }
                className="period-date__date-picker"
                value={date.formattedNextDate || ""}
                type="date"
                id="toDate"
                min={date.formattedDate}
                disabled={!date.date}
              />
            </div>
          </div>
        </>
      ) : (
        <h1 className="period-date__label">{date.label}</h1>
      )}
    </header>
  );
};

export default PeriodDate;

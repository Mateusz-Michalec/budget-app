import { Period } from "../components/TransactionsDashboard/components/PeriodTabs/PeriodTabs";

export type PeriodTab = {
  date: Date | null;
  formattedDate?: string;
  nextDate?: Date | null;
  formattedNextDate?: string;
  label: string;
  transactionsTimestamp: number | [number, number] | null;
};

export type DatePicker = Pick<PeriodTab, "date" | "formattedDate">;

const getInitialDatePickerData = (
  timestamp: null | number = null
): DatePicker => {
  let date;

  if (timestamp) date = new Date(timestamp);
  else date = new Date();

  return {
    date,
    formattedDate: date.toISOString().slice(0, 10),
  };
};

const getNextWeekDate = (date: Date) =>
  new Date(date.setDate(date.getDate() + 7));

const getInitialPeriodTabData = (period: Period = "Tydzień"): PeriodTab => {
  const today = new Date();
  const todayTimestamp = today.getTime();
  const plCode = "pl-PL";
  const nextWeek = getNextWeekDate(new Date());

  switch (period) {
    case "Dzień":
      return {
        date: today,
        transactionsTimestamp: todayTimestamp,
        label: today.toLocaleDateString(plCode, {
          day: "numeric",
          month: "long",
          weekday: "long",
        }),
      };
    case "Miesiąc":
      return {
        date: today,
        transactionsTimestamp: todayTimestamp,
        label: today.toLocaleDateString(plCode, { month: "long" }),
      };
    case "Rok":
      return {
        date: today,
        transactionsTimestamp: todayTimestamp,
        label: `${today.getFullYear()}`,
      };

    case "Zakres":
      return {
        date: null,
        formattedDate: "",
        nextDate: null,
        formattedNextDate: "",
        transactionsTimestamp: null,
        label: "Wybierz zakres",
      };

    default:
      return {
        date: today,
        nextDate: nextWeek,
        transactionsTimestamp: [todayTimestamp, nextWeek.getTime()],
        label: `${today.toLocaleDateString(
          plCode
        )} - ${nextWeek.toLocaleDateString(plCode)}`,
      };
  }
};

const isToday = (timestamp: number) => {
  const today = new Date();
  const dateToCheck = new Date(timestamp);

  return (
    today.getDate() === dateToCheck.getDate() &&
    today.getMonth() === dateToCheck.getMonth() &&
    today.getFullYear() === dateToCheck.getFullYear()
  );
};

const isCurrentMonth = (timestamp: number) => {
  const today = new Date();
  const dateToCheck = new Date(timestamp);

  return (
    today.getMonth() === dateToCheck.getMonth() &&
    today.getFullYear() === dateToCheck.getFullYear()
  );
};

const isCurrentYear = (timestamp: number) => {
  const today = new Date();
  const dateToCheck = new Date(timestamp);

  return today.getFullYear() === dateToCheck.getFullYear();
};

export default {
  getInitialPeriodTabData,
  getInitialDatePickerData,
  isToday,
  isCurrentMonth,
  isCurrentYear,
};

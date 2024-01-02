import { Period } from "../components/OperationsCard/components/PeriodTabs/PeriodTabs";

export type DatePicker = {
  date: Date | null;
  formattedDate: string;
  nextDate: Date | null;
  formattedNextDate: string;
};

const get7DaysLater = (date: Date) =>
  new Date(date.setDate(date.getDate() + 7));

const getFormatedDateByPeriod = (period: Period): string => {
  const date = new Date();
  let options = {};

  switch (period) {
    case "Dzień":
      options = {
        day: "numeric",
        month: "long",
        weekday: "long",
      };
      return date.toLocaleDateString("pl-PL", options);

    case "Miesiąc":
      options = {
        month: "long",
      };
      return date.toLocaleDateString("pl-PL", options);

    case "Rok":
      return `${date.getFullYear()}`;

    case "Okres":
      return "Wybierz okres";

    default:
      return `${date.toLocaleDateString("pl-PL")} - ${get7DaysLater(
        date
      ).toLocaleDateString("pl-PL")}`;
  }
};

const getInitialPickerData = (currentPeriod: Period = "Dzień"): DatePicker => {
  const date = new Date();

  switch (currentPeriod) {
    case "Dzień":
    case "Miesiąc":
    case "Rok":
      return {
        date: date,
        formattedDate: date.toISOString().slice(0, 10),
        nextDate: null,
        formattedNextDate: "",
      };

    case "Okres":
      return {
        date: null,
        formattedDate: "",
        nextDate: null,
        formattedNextDate: "",
      };

    default:
      return {
        date: date,
        formattedDate: "",
        nextDate: get7DaysLater(new Date()),
        formattedNextDate: "",
      };
  }
};

const isToday = (timestamp: number) => {
  const today = new Date();
  const dateToCheck = new Date(timestamp);

  const isToday =
    today.getDate() === dateToCheck.getDate() &&
    today.getMonth() === dateToCheck.getMonth() &&
    today.getFullYear() === dateToCheck.getFullYear();

  return isToday;
};

export default { getFormatedDateByPeriod, getInitialPickerData, isToday };

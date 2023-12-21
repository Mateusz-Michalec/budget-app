export type DateUtilsType = {
  date: Date;
  nextDate: Date;
  localePeriod: string;
  formattedDate: string;
};

type DateWithFormat = Pick<DateUtilsType, "date" | "formattedDate">;

const getLocaleDate = (
  period: string
): Pick<DateUtilsType, "date" | "localePeriod"> => {
  const date = new Date();
  const options = { [period]: "long", timeZone: "UTC" } as const;
  const locale = "pl-PL";

  return {
    date: date,
    localePeriod: new Intl.DateTimeFormat(locale, options).format(date),
  };
};

const formatDate = (date: Date): string =>
  `${date.getDate()}/${date.getMonth() + 1}`;

const getTodayDate = (): DateWithFormat => {
  const { date, localePeriod } = getLocaleDate("weekday");

  return {
    date,
    formattedDate: `${formatDate(date)} (${localePeriod})`,
  };
};

const getNextWeek = (): Omit<DateUtilsType, "localePeriod"> => {
  const date = new Date();

  const nextWeek = new Date(date);
  nextWeek.setDate(date.getDate() + 7);

  return {
    date,
    nextDate: nextWeek,
    formattedDate: `${formatDate(date)} - ${formatDate(nextWeek)}`,
  };
};

const getCurrentMonth = (): DateWithFormat => {
  const { date, localePeriod } = getLocaleDate("month");

  return {
    date,
    formattedDate: `${date.getMonth() + 1} (${localePeriod})`,
  };
};

const getCurrentYear = (): DateWithFormat => {
  const date = new Date();
  return {
    date,
    formattedDate: `${date.getFullYear()}`,
  };
};

export default { getTodayDate, getNextWeek, getCurrentMonth, getCurrentYear };

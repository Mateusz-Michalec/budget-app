import { OperationsType } from "../components/TransactionsDashboard/TransactionsDashboard";
import { Period } from "../components/TransactionsDashboard/components/PeriodTabs/PeriodTabs";
import {
  FilteredTransactions,
  Transaction,
} from "../features/accounts/accountsSlice";
import DateUtils from "./DateUtils";

export type SortType = "asc" | "desc";

type Icon =
  | "bag"
  | "cart"
  | "gift"
  | "cash-coin"
  | "tags"
  | "airplane"
  | "controller";

export type TransactionIcon = {
  icon: Icon;
  bgColor: string;
};

export type CategoriesTotalAmount = Record<string, number>;

type TransactionGroups = Record<string, Transaction[]>;

export type TransactionsSum = Record<OperationsType, number>;

const categories: Record<string, TransactionIcon> = {
  różne: {
    icon: "bag",
    bgColor: "#3498db",
  },
  jedzenie: {
    icon: "cart",
    bgColor: "#2ecc71",
  },
  prezenty: {
    icon: "gift",
    bgColor: "#e74c3c",
  },
  wypłata: {
    icon: "cash-coin",
    bgColor: "#f39c12",
  },
  ubrania: {
    icon: "tags",
    bgColor: "#9b59b6",
  },
  transport: {
    icon: "airplane",
    bgColor: "#1abc9c",
  },
  elektronika: {
    icon: "controller",
    bgColor: "#d35400",
  },
};

const getTransactionIcon = (category: string) => categories[category];

const getCategoryColor = (category: string) => categories[category].bgColor;

const getGroupedTransactions = (transactions: Transaction[]) =>
  transactions?.reduce((groups: TransactionGroups, transaction) => {
    const date = new Date(transaction.timestamp).toLocaleDateString();

    if (!groups[date]) groups[date] = [];

    groups[date].push(transaction);

    return groups;
  }, {});

const getTransactionsSum = (transactions: FilteredTransactions) => {
  let transactionsSum: TransactionsSum = {
    expenses: 0,
    incomes: 0,
  };

  Object.entries(transactions).map(
    ([operationType, transactionList]) =>
      (transactionsSum[operationType as OperationsType] =
        transactionList.reduce(
          (sum, transaction) => sum + transaction.amount,
          0
        ))
  );

  return transactionsSum;
};

const getTransactionsSumDifference = (transactionsSum: TransactionsSum) => {
  const { expenses, incomes } = transactionsSum;

  const difference = Math.abs(expenses - incomes);
  const isMoreExpenses = expenses > incomes;

  return (
    <p className={`${isMoreExpenses ? "u-text-danger" : "u-text-success"}`}>
      {isMoreExpenses ? "▼" : "▲"} {difference} PLN
    </p>
  );
};

const getCategoriesTotalAmount = (transactions: Transaction[]) =>
  transactions.reduce(
    (categoriesTotalAmount: Record<string, number>, transaction) => {
      const { category, amount } = transaction;

      if (!categoriesTotalAmount[category])
        categoriesTotalAmount[category] = amount;
      else categoriesTotalAmount[category] += amount;

      return categoriesTotalAmount;
    },
    {}
  );

const filterTransactions = (
  transactions: Transaction[],
  period: Period,
  timestamp: [number, number] | number
) =>
  transactions.filter((transaction) => {
    switch (period) {
      case "Dzień":
        return DateUtils.isToday(transaction.timestamp);
      case "Miesiąc":
        return DateUtils.isCurrentMonth(transaction.timestamp);
      case "Rok":
        return DateUtils.isCurrentYear(transaction.timestamp);
      default:
        return (
          transaction.timestamp >= (timestamp as [number, number])[0] ||
          (DateUtils.isToday(transaction.timestamp) &&
            transaction.timestamp <= (timestamp as [number, number])[1])
        );
    }
  });

const sortCategoriesTotalAmount = (
  categoriesTotalAmount: Record<string, number>,
  sortType: SortType
) => {
  const keyValueArr = Object.entries(categoriesTotalAmount);

  if (sortType === "asc") keyValueArr.sort((a, b) => a[1] - b[1]);
  else keyValueArr.sort((a, b) => b[1] - a[1]);

  return Object.fromEntries(keyValueArr);
};

export default {
  categories,
  getTransactionIcon,
  getCategoryColor,
  getGroupedTransactions,
  getTransactionsSum,
  getTransactionsSumDifference,
  getCategoriesTotalAmount,
  filterTransactions,
  sortCategoriesTotalAmount,
};

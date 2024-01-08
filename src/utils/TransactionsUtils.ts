import { Transaction } from "../features/accounts/accountsSlice";

type TransactionIcon = {
  icon: string;
  bgColor: string;
};

type CategoryStats = {
  totalAmount: number;
  totalPercentage: number;
};

type Icon =
  | "bag"
  | "cart"
  | "gift"
  | "cash-coin"
  | "tags"
  | "airplane"
  | "controller";

type TransactionGroups = Record<string, Transaction[]>;

type TransactionCategories = Record<Icon, CategoryStats>;

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

const getTransactionsSum = (transactions: Transaction[]) =>
  transactions?.reduce((acc, transaction) => acc + transaction.amount, 0);

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

export default {
  categories,
  getTransactionIcon,
  getCategoryColor,
  getGroupedTransactions,
  getTransactionsSum,
  getCategoriesTotalAmount,
};

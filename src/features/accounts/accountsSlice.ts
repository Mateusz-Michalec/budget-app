import {
  PayloadAction,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { OperationsType } from "../../components/OperationsCard/OperationsCard";
import { DateUtils } from "../../utils";

export type Transaction = {
  id: string;
  operationType: OperationsType;
  accountId: string;
  timestamp: number;
  amount: number;
  description: string;
  icon: string;
};

export type Account = {
  id: string;
  name: string;
  balance: number;
  expenses: Transaction[];
  incomes: Transaction[];
  defaultAccount: boolean;
};

const accountsAdapter = createEntityAdapter<Account>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const accountsSlice = createSlice({
  name: "accounts",
  initialState: accountsAdapter.getInitialState(),
  reducers: {
    addAccount(
      state,
      action: PayloadAction<Pick<Account, "name" | "balance">>
    ) {
      const accounts = selectAllAccounts;
      const isEmpty = accounts.length === 0;
      accountsAdapter.addOne(state, {
        ...action.payload,
        expenses: [],
        incomes: [],
        id: nanoid(),
        defaultAccount: isEmpty ? false : true,
      });
    },
    hydrateAccounts: (state, action) => {
      return action.payload;
    },
    setDefaultAccount: (state, action: PayloadAction<string>) => {
      Object.values(state.entities).forEach(
        (account) => (account.defaultAccount = false)
      );
      state.entities[action.payload].defaultAccount = true;
    },
    addTransaction: (state, action: PayloadAction<Omit<Transaction, "id">>) => {
      const { accountId, operationType, amount } = action.payload;
      const account = state.entities[accountId];
      if (operationType === "expenses") {
        account.expenses.push({ ...action.payload, id: nanoid() });
        account.balance -= amount;
      } else {
        account.incomes.push({ ...action.payload, id: nanoid() });
        account.balance += amount;
      }
    },
  },
});

export const {
  selectAll: selectAllAccounts,
  selectById: selectAccountById,
  selectIds: selectAccountsIds,
} = accountsAdapter.getSelectors((state: RootState) => state.accounts);

export const selectAccountNames = createSelector(
  [selectAllAccounts],
  (accounts) => accounts.map((account) => account.name)
);

export const getAccountIdByName = createSelector(
  [selectAllAccounts, (state, accountName) => accountName],
  (accounts, accountName) =>
    accounts.find((acc) => acc.name === accountName)?.id
);

export const getDefaultAccount = createSelector(
  [selectAllAccounts],
  (accounts) => accounts.find((acc) => acc.defaultAccount)
);

export const getAccountBalanceByName = createSelector(
  [selectAllAccounts, (state, accountName) => accountName],
  (accounts, accountName) => {
    if (accountName.toLowerCase() === "suma")
      return accounts.reduce((sum, account) => sum + account.balance, 0);
    else
      return accounts.find((account) => account.name === accountName)?.balance;
  }
);

export const selectTransactions = createSelector(
  [
    selectAllAccounts,
    (state, { accountName }: { accountName: string }) => accountName,
    (state, { timestamp }: { timestamp: [number, number] | number }) =>
      timestamp,
    (state, { operationType }: { operationType: OperationsType }) =>
      operationType,
  ],
  (accounts, accountName, timestamp, operationType) => {
    const account = accounts.find((acc) => acc.name === accountName);

    const transactions =
      operationType === "expenses" ? account?.expenses : account?.incomes;

    const filteredTransactions =
      typeof timestamp === "number"
        ? transactions?.filter((transaction) =>
            DateUtils.isToday(transaction.timestamp)
          )
        : transactions?.filter(
            (transaction) =>
              transaction.timestamp >= timestamp[0] ||
              (DateUtils.isToday(transaction.timestamp) &&
                transaction.timestamp <= timestamp[1])
          );

    return filteredTransactions;
  }
);

export const {
  addAccount,
  hydrateAccounts,
  setDefaultAccount,
  addTransaction,
} = accountsSlice.actions;

export default accountsSlice.reducer;

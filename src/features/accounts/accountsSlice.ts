import {
  PayloadAction,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { OperationsType } from "../../components/OperationsCard/OperationsCard";

export type Transaction = {
  id: string;
  type: OperationsType["type"];
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
      const { accountId, type, amount } = action.payload;
      const account = state.entities[accountId];
      if (type === "expenses") {
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
    (state, accountName) => accountName,
    (state, timestampRange) => timestampRange,
    (state, type) => type,
  ],
  (accounts, { accountName, timestampRange, type }) => {
    const account = accounts.find((acc) => acc.name === accountName);
    if (type === "expenses")
      return account?.expenses.filter(
        (transaction) =>
          transaction.timestamp >= timestampRange[0] &&
          transaction.timestamp <= timestampRange[1]
      );
    else
      return account?.incomes.filter(
        (transaction) =>
          transaction.timestamp >= timestampRange[0] &&
          transaction.timestamp <= timestampRange[1]
      );
  }
);

export const {
  addAccount,
  hydrateAccounts,
  setDefaultAccount,
  addTransaction,
} = accountsSlice.actions;

export default accountsSlice.reducer;

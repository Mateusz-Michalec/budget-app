import { PayloadAction, configureStore, isAnyOf } from "@reduxjs/toolkit";
import accountsSlice, {
  addAccount,
  addTransaction,
  deleteTransaction,
  editTransaction,
  hydrateAccounts,
} from "../features/accounts/accountsSlice";
import { listenerMiddleware, startAppListening } from "./listenerMiddleware";
import { LocalStorage } from "../utils";
import { ACCOUNTS_KEY } from "../utils/LocalStorage";

startAppListening({
  matcher: isAnyOf(
    addAccount,
    addTransaction,
    editTransaction,
    deleteTransaction
  ),
  effect: (action, listenerApi) =>
    LocalStorage.saveData(listenerApi.getState().accounts, ACCOUNTS_KEY),
});

export const store = configureStore({
  reducer: {
    accounts: accountsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

const storedAccounts = LocalStorage.getStoredData(ACCOUNTS_KEY);
if (storedAccounts) store.dispatch(hydrateAccounts(storedAccounts));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

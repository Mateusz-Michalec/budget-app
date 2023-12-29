import { EntityState } from "@reduxjs/toolkit";
import { Account } from "../features/accounts/accountsSlice";

export const ACCOUNTS_KEY = "budget-app-accounts";

type Key = typeof ACCOUNTS_KEY;

const getStoredData = (key: Key) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  return null;
};

const saveData = (data: EntityState<Account, string> | string, key: Key) =>
  localStorage.setItem(key, JSON.stringify(data));

export default { getStoredData, saveData };

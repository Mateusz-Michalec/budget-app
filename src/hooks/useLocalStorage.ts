import React, { useEffect, useState } from "react";
import { OperationsType } from "../components/OperationsCard/OperationsCard";

type Transaction = {
  date: number;
  amount: number;
  description: string;
  icon: string;
};

type FinanceAccount = {
  name: string;
  expenses: Transaction[];
  incomes: Transaction[];
};

type FinanceAccounts = FinanceAccount[];

const initialData: FinanceAccounts = [];

const LOCAL_STORAGE_KEY = "finance-accounts";
const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);

const accountsData = localStorageData
  ? JSON.parse(localStorageData)
  : initialData;

export const useLocalStorage = () => {
  const [accounts, setAccounts] = useState<FinanceAccounts>(accountsData);

  const saveToLocalStorage = (newData: FinanceAccounts) =>
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));

  const addNewAccount = (account: string) => {
    const newData = [...accounts, { name: account, expenses: [], incomes: [] }];
    setAccounts(newData);
    saveToLocalStorage(newData);
  };

  const deleteAccount = (accountName: string) => {
    const newData = accounts.filter((account) => account.name !== accountName);
    setAccounts(newData);
    saveToLocalStorage(newData);
  };

  const addTransaction = (
    accountName: string,
    operationType: OperationsType,
    transaction: Transaction
  ) => {
    const account = accounts.find((account) => account.name === accountName);

    if (account) {
    }
  };

  return { addNewAccount };
};

import React from "react";
import { useAppSelector } from "../../app/hooks";
import { getDefaultAccount } from "../../features/accounts/accountsSlice";
import "./Transaction.scss";

const Transaction = () => {
  const activeAccount = useAppSelector(getDefaultAccount);

  console.log(activeAccount);

  return <div>Transaction</div>;
};

export default Transaction;

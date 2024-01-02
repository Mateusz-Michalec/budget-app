import React from "react";
import { useAppSelector } from "../../app/hooks";
import { getDefaultAccount } from "../../features/accounts/accountsSlice";
import "./SingleTransaction.scss";

const SingleTransaction = () => {
  const activeAccount = useAppSelector(getDefaultAccount);

  console.log(activeAccount);

  return <div>Transaction</div>;
};

export default SingleTransaction;

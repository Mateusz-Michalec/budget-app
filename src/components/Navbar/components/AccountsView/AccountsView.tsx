import AddNewAccount from "../../../AddNewAccount";
import { useAppSelector } from "../../../../app/hooks";
import {
  getAccountBalanceByName,
  getDefaultAccount,
  selectAccountNames,
} from "../../../../features/accounts/accountsSlice";
import { useState } from "react";

const AccountsView = () => {
  const accountNames = useAppSelector(selectAccountNames);
  const defaultAccount = useAppSelector(getDefaultAccount);

  const [activeAccount, setActiveAccount] = useState(defaultAccount?.name);

  const accountBalance = useAppSelector((state) =>
    getAccountBalanceByName(state, activeAccount)
  );

  return (
    <div className="nav__account">
      {accountNames.length > 0 ? (
        <>
          <select
            value={activeAccount}
            onChange={(e) => setActiveAccount(e.target.value)}
            id="navAccounts"
          >
            {accountNames.map((name) => (
              <option key={name}>{name}</option>
            ))}
            <option>Suma</option>
          </select>
          <span>
            <b>{accountBalance} zł</b>
          </span>
        </>
      ) : (
        <AddNewAccount />
      )}
    </div>
  );
};

export default AccountsView;

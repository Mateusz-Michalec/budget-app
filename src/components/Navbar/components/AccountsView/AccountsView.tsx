import AddEditAccount from "../../../AddEditAccount/AddEditAccount";
import { useAppSelector } from "../../../../app/hooks";
import {
  getAccountBalanceByName,
  getDefaultAccountName,
  selectAccountNames,
} from "../../../../features/accounts/accountsSlice";
import { useEffect, useState } from "react";
import useModal from "../../../ui/Modal/useModal";
import "./AccountsView.scss";

const AccountsView = () => {
  const accountNames = useAppSelector(selectAccountNames);
  const defaultAccount = useAppSelector(getDefaultAccountName);

  const [activeAccount, setActiveAccount] = useState(defaultAccount);
  const activeAccountBalance = useAppSelector((state) =>
    getAccountBalanceByName(state, activeAccount)
  );

  useEffect(() => {
    setActiveAccount(defaultAccount);
  }, [defaultAccount]);

  const { Modal, showModal, closeModal } = useModal();

  return (
    <div>
      {accountNames.length > 0 ? (
        <div className="accounts-view">
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
            <b>{activeAccountBalance} zł</b>
          </span>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => showModal()}
            className="u-btn-with-icon"
          >
            <i className="bi bi-database-add"></i>
            <span>Dodaj konto</span>
          </button>
          <Modal>
            <AddEditAccount closeModal={closeModal} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default AccountsView;

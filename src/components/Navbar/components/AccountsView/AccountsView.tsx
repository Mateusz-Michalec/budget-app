import AddNewAccount from "../../../AddNewAccount";
import { useAppSelector } from "../../../../app/hooks";
import {
  getAccountBalanceByName,
  getDefaultAccount,
  selectAccountNames,
} from "../../../../features/accounts/accountsSlice";
import { useState } from "react";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../ui/Modal/Modal";

const AccountsView = () => {
  const accountNames = useAppSelector(selectAccountNames);
  const defaultAccount = useAppSelector(getDefaultAccount);

  const [activeAccount, setActiveAccount] = useState(defaultAccount?.name);
  const activeAccountBalance = useAppSelector((state) =>
    getAccountBalanceByName(state, activeAccount)
  );

  const { modalRef, isModal, showModal, closeModal } = useModal();

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
            <b>{activeAccountBalance} zł</b>
          </span>
        </>
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
          <Modal isModal={isModal} ref={modalRef} closeModal={closeModal}>
            <AddNewAccount closeModal={closeModal} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default AccountsView;

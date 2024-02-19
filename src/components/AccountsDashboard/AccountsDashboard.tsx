import React, { useEffect, useState } from "react";
import "./AccountsDashboard.scss";
import { useAppSelector } from "../../app/hooks";
import {
  Account,
  getAccountBalanceByName,
  getAccountIdByName,
  selectAccountById,
  selectAccountNames,
  selectAllAccounts,
} from "../../features/accounts/accountsSlice";
import useModal from "../ui/Modal/useModal";
import AddEditAccount from "../AddEditAccount/AddEditAccount";
import useConfirmDelete from "../ui/ConfirmDelete/ConfirmDelete";

const AccountsDashboard = () => {
  const accounts = useAppSelector(selectAllAccounts);

  const [accountIdToEdit, setAccountIdToEdit] = useState<string | null>(null);

  const accountToEdit = accountIdToEdit
    ? useAppSelector((state) => selectAccountById(state, accountIdToEdit))
    : null;

  const { Modal, showModal } = useModal();
  const { ConfirmDelete, showConfirmDelete, isConfirmDelete } =
    useConfirmDelete();

  return (
    <>
      <Modal>
        {isConfirmDelete ? (
          <ConfirmDelete
            title={`Usuwanie konta (${accountToEdit?.name})`}
            message="Czy na pewno chcesz usunąć konto?"
            onConfirm={() => {}}
          />
        ) : (
          <AddEditAccount accountIdToEdit={accountIdToEdit} />
        )}
      </Modal>
      <button type="button" className="u-icon-btn" onClick={() => showModal()}>
        <i className="bi bi-plus-circle"></i>
      </button>
      <section className="accounts-dashboard">
        {accounts.map((account, index) => (
          <div key={account.id} className="accounts-dashboard__account">
            <span>
              {index + 1}. {account.name}
            </span>
            <span>{account.balance} PLN</span>
            <div className="u-icon-btn-group">
              <button
                onClick={() => {
                  showModal();
                  setAccountIdToEdit(account.id);
                }}
                className=""
                aria-label="edytuj konto"
              >
                <i className="bi bi-pencil-square"></i>
              </button>

              <button
                onClick={() => {
                  setAccountIdToEdit(account.id);
                  showModal();
                  showConfirmDelete();
                }}
                className=""
                aria-label="usuń konto"
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        ))}
        <div className="accounts-dashboard__sum-balance">
          Suma:{" "}
          {useAppSelector((state) => getAccountBalanceByName(state, "suma"))}{" "}
          PLN
        </div>
      </section>
    </>
  );
};

export default AccountsDashboard;

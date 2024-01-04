import "./Navbar.scss";
import AccountsView from "./components/AccountsView/AccountsView";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__options">
        <button type="button" aria-label="menu">
          <i className="bi bi-list"></i>
        </button>
        <AccountsView />
      </div>
    </nav>
  );
};

export default Navbar;

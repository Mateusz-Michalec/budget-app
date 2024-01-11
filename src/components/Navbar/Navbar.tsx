import "./Navbar.scss";
import AccountsView from "./components/AccountsView/AccountsView";
import Menu from "./components/Menu/Menu";

const Navbar = () => {
  return (
    <nav className="nav">
      <Menu />
      <AccountsView />
    </nav>
  );
};

export default Navbar;

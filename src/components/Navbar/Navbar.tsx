import React from "react";
import "./Navbar.scss";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="nav">
      <div className="nav__options">
        <button type="button">
          <i className="bi bi-list"></i>
        </button>
        <div className="nav__account">
          <i className="bi bi-coin"></i>
          <span>Suma: 2000 zł</span>
        </div>
      </div>
      <ul className="nav__tabs">
        <li>
          <a
            className={`${
              pathname === "/wydatki" || pathname === "/"
                ? "u-active-indicator"
                : "u-muted"
            }`}
            href="/wydatki"
          >
            Wydatki
          </a>
        </li>
        <li>
          <a
            className={`${
              pathname === "/dochody" ? "u-active-indicator" : "u-muted"
            }`}
            href="/dochody"
          >
            Dochody
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

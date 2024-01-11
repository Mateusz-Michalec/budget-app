import React, { useState } from "react";
import "./Menu.scss";
import { useLocation } from "react-router-dom";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`nav__menu-overlay ${
          isMenuOpen ? "nav__menu-overlay--active" : ""
        }`}
      ></div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        type="button"
        aria-label="menu"
        className="nav__hamburger"
      >
        <i className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"} `}></i>
      </button>
      <ul className={`nav__menu ${isMenuOpen ? "nav__menu--open" : ""} `}>
        <li className={`${pathname === "/" ? "" : "u-muted"} nav__menu-link`}>
          <a href="/">
            <i className="bi bi-cash-stack"></i>
            <span>Transakcje</span>
          </a>
        </li>

        <li
          className={`${pathname === "/konta" ? "" : "u-muted"} nav__menu-link`}
        >
          <a href="/konta">
            {" "}
            <i className="bi bi-person-circle"></i>
            <span>Konta</span>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Menu;

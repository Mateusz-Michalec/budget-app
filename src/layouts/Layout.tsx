import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="u-main-container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

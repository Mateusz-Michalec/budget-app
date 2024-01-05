import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="u-content-card">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

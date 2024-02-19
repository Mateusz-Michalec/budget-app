import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import TransactionsDashboard from "./components/TransactionsDashboard/TransactionsDashboard";
import AccountsDashboard from "./components/AccountsDashboard/AccountsDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TransactionsDashboard />} />
        <Route path="konta" element={<AccountsDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;

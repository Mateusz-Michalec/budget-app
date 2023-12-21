import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Expenses from "./pages/Expenses/Expenses";
import OperationsCard from "./components/OperationsCard/OperationsCard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<OperationsCard type="expenses" />} />
        <Route path="/wydatki" element={<OperationsCard type="expenses" />} />
      </Route>
    </Routes>
  );
};

export default App;

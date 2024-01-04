import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import OperationsCard from "./components/OperationsCard/OperationsCard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<OperationsCard />} />
      </Route>
    </Routes>
  );
};

export default App;

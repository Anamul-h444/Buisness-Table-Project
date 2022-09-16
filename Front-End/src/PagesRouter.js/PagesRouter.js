import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductListPage from "../pages/ProductListPage";

function PagesRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
    </Routes>
  );
}

export default PagesRouter;

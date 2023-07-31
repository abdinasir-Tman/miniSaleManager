import React from "react";
import Home from "../pages/Home";
import Customer from "../pages/Customer";
import Items from "../pages/Items";
import Sales from "../pages/Sales";
import { Route, Routes } from "react-router-dom";

const MainBar = () => {
  return (
    <div className="bg-green-400 col-span-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/items" element={<Items />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </div>
  );
};

export default MainBar;

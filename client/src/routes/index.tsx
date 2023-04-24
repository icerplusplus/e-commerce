import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route
          path='/product/:id'
          element={<Detail />}
        /> */}
      {/* <Route
          path='/categories/:id'
          element={<Category />}
        />
        <Route
          path='/your-cart/'
          element={<Cart />}
        /> */}
    </Routes>
  );
}

export default Router;

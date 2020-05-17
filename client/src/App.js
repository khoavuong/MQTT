import React from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Account } from "./pages/Account";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Route path="/" exact component={Home} />
        <Route path="/account" component={Account} />
      </BrowserRouter>
    </div>
  );
};

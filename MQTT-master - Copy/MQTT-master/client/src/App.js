import React from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import Account from "./pages/Account";
import { Manage } from "./pages/Manage";
import Device from "./pages/Device";
import Notificate from "./pages/Notificate";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>
        <Route path="/" exact component={Home} />
        <Route path="/manage" exact component={Manage} />
        <Route path="/notificate" exact component={Notificate} />
        <Route path="/device" exact component={Device} />
        <Route path="/account" exact component = {Account}/>
      </BrowserRouter>
    </div>
  );
};

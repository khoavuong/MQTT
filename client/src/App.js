import React from "react";
import NavBar from "./components/NavBar";
import { Home } from "./pages/Home";
import "./App.css";

export const App = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Home></Home>
    </div>
  );
};

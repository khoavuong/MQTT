import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Account } from "./pages/Account";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPass } from "./pages/ResetPass";
import { VerifyAcc } from "./pages/VerifyAcc";

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/account" component={Account} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:resetPasswdToken" component={ResetPass} />
        <Route path="/verify/:verifyToken" component={VerifyAcc} />
      </BrowserRouter>
    </div>
  );
};

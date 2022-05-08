import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterSreen } from "../components/auth/RegisterSreen";

export const AuthRouter = () => {
  return (
    <div className="gradient-custom">
      <Switch>
        <Route exact path="/auth/login" component={LoginScreen} />
        <Route exact path="/auth/register" component={RegisterSreen} />
        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
};

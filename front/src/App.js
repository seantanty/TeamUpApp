import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage.js";
import LoginPage from "./Pages/LoginPage.js";
import RegisterPage from "./Pages/RegisterPage.js"
import Header from "./Components/Header.js";

function App() {
  return (
    <Router>
      <Header></Header>

      <Switch>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>

        <Route path="/register">
          <RegisterPage></RegisterPage>
        </Route>

        <Route path="/">
          <HomePage></HomePage>
        </Route>
      </Switch>

    </Router>
  );
}

export default App;

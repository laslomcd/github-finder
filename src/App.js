import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar.component";
import User from "./components/Users/User.component";
import About from "./components/Pages/About.component";
import Alert from "./components/layout/Alert.component";
import Home from "./components/Pages/Home.component";
import NotFound from "./components/Pages/NotFound.component";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/user/:login" component={User} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default App;

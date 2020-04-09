import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar.component";
import Users from "./components/Users/Users.component";
import User from "./components/Users/User.component";
import Search from "./components/Users/Search.component";
import About from "./components/Pages/About.component";
import Alert from "./components/layout/Alert.component";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Alert />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Fragment>
                <Search />
                <Users {...props} />
              </Fragment>
            )}
          />
          <Route exact path="/about" render={(props) => <About {...props} />} />
          <Route
            exact
            path="/user/:login"
            render={(props) => <User {...props} />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;

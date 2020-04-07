import React, { Fragment, useState } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/layout/Navbar.component";
import Users from "./components/Users/Users.component";
import User from "./components/Users/User.component";
import Search from "./components/Users/Search.component";
import About from "./components/Pages/About.component";
import Alert from "./components/layout/Alert.component";

import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // async componentDidMount() {
  //     this.setState({ loading: true });
  //     const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //     this.setState({ users: response.data, loading: false });

  // }
  // Search Github Users
  const searchUsers = async (text) => {
    //this.setState({ loading: true});
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //this.setState({ users: response.data.items, loading: false });
    setUsers(response.data.items);
    setLoading(false);
  };

  // Get Single User
  const getUser = async (username) => {
    //this.setState({ loading: true });
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //this.setState({ user: response.data, loading: false });
    setUser(response.data);
    setLoading(false);
  };

  // Get User Repos
  const getUserRepos = async (username) => {
    //this.setState({ loading: true });
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    //this.setState({ repos: response.data, loading: false });
    setRepos(response.data);
    setLoading(false);
  };

  // Clear Users from State
  const clearUsers = () => {
    //this.setState({ users: [], loading: false });
    setUsers([]);
    setLoading(false);
  };

  const setAlertType = (message, type) => {
    //this.setState({ alert: { message: message, type: type } });
    setAlert({ message, type });
    //setTimeout(() => this.setState({ alert: null }), 3000);
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Alert alert={alert} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Fragment>
                <Search
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  showClear={users.length > 0 ? true : false}
                  setAlert={setAlertType}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )}
          />
          <Route exact path="/about" render={(props) => <About {...props} />} />
          <Route
            exact
            path="/user/:login"
            render={(props) => (
              <User
                {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;

import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/layout/Navbar.component";
import Users from "./components/Users/Users.component";
import User from "./components/Users/User.component";
import Search from "./components/Users/Search.component";
import About from "./components/Pages/About.component";
import Alert from "./components/layout/Alert.component";

import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };
  // async componentDidMount() {
  //     this.setState({ loading: true });
  //     const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //     this.setState({ users: response.data, loading: false });

  // }
  // Search Github Users
  searchUsers = async text => {
    this.setState({ loading: true });
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: response.data.items, loading: false });
  };

  // Get Single User
  getUser = async username => {
    this.setState({ loading: true });
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: response.data, loading: false });
  };

  // Get User Repos
  getUserRepos = async username => {
    this.setState({ loading: true });
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: response.data, loading: false });
  };

  // Clear Users from State
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (message, type) => {
    this.setState({ alert: { message: message, type: type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, user, loading, repos } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" render={props => <About {...props} />} />
            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
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
  }
}

export default App;

import React, { Component } from "react";
import axios from 'axios';

import Navbar from './components/layout/Navbar.component';
import Users from './components/Users/Users.component';
import Search from './components/Users/Search.component';

import "./App.css";

class App extends Component {
    state = {
        users: [],
        loading: false
    }
    // async componentDidMount() {
    //     this.setState({ loading: true });
    //     const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    //     this.setState({ users: response.data, loading: false });

    // }

    searchUsers = async text => {
        this.setState({ loading: true })
        const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        this.setState({ users: response.data.items, loading: false });
    }

    clearUsers = () => {
        this.setState({ users: [], loading: false });
    }

    render() {
        const { users, loading } = this.state;
        return (
            <div className="App">
                <Navbar />
                <div className="container">
                    <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} />
                    <Users loading={loading} users={users} />
                </div>

            </div>
        );
    }
}

export default App;

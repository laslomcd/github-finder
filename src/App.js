import React, { Component } from "react";
import axios from 'axios';

import Navbar from './components/layout/Navbar.component';
import Users from './components/Users/Users.component';

import "./App.css";

class App extends Component {
    state = {
        users: [],
        loading: false
    }
    async componentDidMount() {
        this.setState({ loading: true });
        const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        this.setState({ users: response.data, loading: false });

    }
    render() {
        return (
            <div className="App">
                <Navbar />
                <div className="container">
                    <Users loading={this.state.loading} users={this.state.users} />
                </div>

            </div>
        );
    }
}

export default App;

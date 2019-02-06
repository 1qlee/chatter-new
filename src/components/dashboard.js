import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import Anchor from "./anchor";
import Chat from "./chat/chatroom";
import Navbar from "./navbar";
import Loader from "./loader";

export default class Dashboard extends Component {
  state = {
    isAuthenticated: true,
    isLoading: true,
    user: {}
  }

  componentDidMount() {
    this.fetchUser()
      .then(res => this.setState({ user: res.user, isLoading: false }))
      .catch(err => console.log(err));
  }

  fetchUser = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error("Error: Couldn't fetch user.");
    console.log(body);
    return body;
  }

  logoutUser = async () => {
    const response = await fetch('/api/logout');
    const body = await response.json();

    if (response.status !== 200) throw Error("Error: Couldn't log user out.");

    this.setState({
      isAuthenticated: false
    });
  }

  render() {
    if (this.state.isLoading && this.state.isAuthenticated) {
      return (
        <div>
          <Loader>
            <span></span>
            <span></span>
          </Loader>
        </div>
      )
    }
    else if (this.state.isAuthenticated === false){
      return (
        <Redirect to="/" />
      )
    }
    else {
      return (
        <Chat user={this.state.user}>
          <Anchor onClick={this.logoutUser}>Logout</Anchor>
        </Chat>
      )
    }
  }
}

import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import Anchor from "./anchor";
import Chat from "./chatroom";
import Navbar from "./navbar";
import Loader from "./loader";

export default class Dashboard extends Component {
  state = {
    isAuthenticated: true,
    isLoading: true,
    user: {}
  };

  componentDidMount() {
    this.fetchUser()
      .then(res => this.setState({ user: res.user, isLoading: false }))
      .catch(err => console.log(err));
  };

  fetchUser = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error("Something went wrong with the request.");

    console.log(body);

    return body;
  };

  logoutUser = async () => {
    const response = await fetch('/api/logout');
    const body = await response.json();

    if (response.status !== 200) throw Error("Something went wrong with the request.");

    console.log(body.isAuthenticated);

    this.setState({
      isAuthenticated: body.isAuthenticated
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Loader>
            <span></span>
            <span></span>
          </Loader>
        </div>
      )
    }
    else {
      return (
        <Chat>
          <Anchor onClick={this.logoutUser}>Logout</Anchor>
        </Chat>
      )
    }
  }
}

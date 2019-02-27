import React, { Component } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import Anchor from "./anchor";
import Chatroom from "./chat/chatroom";
import ChatMessages from "./chat/chatmessages";
import Navbar from "./navbar";
import Loader from "./loader";

export default class Dashboard extends Component {
  state = {
    isAuthenticated: true,
    isLoading: true,
    user: {},
    chatrooms: []
  }

  componentDidMount() {
    this.fetchUser()
      .then(res => this.setState({ user: res.user }))
      .catch(err => console.log(err));

    this.fetchChatrooms()
      .then(res => this.setState({ chatrooms: res, isLoading: false }))
      .catch(err => console.log(err));
  }

  // Get the user object for current logged-in user
  fetchUser = async () => {
    const response = await fetch('/api/hello');
    const user = await response.json();

    if (response.status !== 200) throw Error("Error: Couldn't fetch user.");

    return user;
  }

  // Get all chatrooms associated with logged-in user
  fetchChatrooms = async () => {
    const response = await fetch('/api/getchatrooms');
    const chatrooms = await response.json();

    if (response.status !== 200) throw Error("Error: Couldn't fetch chatrooms.");

    return chatrooms;
  }

  // Log the user out
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
        <Chatroom user={this.state.user} chatrooms={this.state.chatrooms}>
          <Anchor onClick={this.logoutUser}>Logout</Anchor>
          <Route path="/chatrooms/:chatroomName" render={(match) => (
            <ChatMessages user={this.state.user} match={match} />
          )}/>
        </Chatroom>
      )
    }
  }
}

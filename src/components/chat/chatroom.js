import React, { Component } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import Anchor from "../anchor";
import Loader from "../loader";
import Navbar from "../navbar";
import styled from "styled-components";
import styles from "../styles";
import { socketSendMessage, socketAppendMessage, socketConnectToChatroom } from "../../api/socketAPI";

import ChatBox from "./chatbox";
import ChatMenu from "./chatmenu";
import ChatMessages from "./chatmessages";
import ChatWindow from "./chatwindow";

const ChatContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
`

class Chatroom extends Component {
  state = {
    message: [],
    user: {},
    chatrooms: [],
    currentChatroom: "",
    isAuthenticated: true,
    isLoading: true
  }

  componentDidMount() {
    const currentChatroom = this.props.location.pathname.substring("11");
    // Run fetchUser to get user object from database
    this.fetchUser()
      .then(res => this.setState({ user: res.user }))
      .catch(err => console.log(err));

    // Run fetchChatrooms to get all chatrooms for user
    this.fetchChatrooms()
      .then(res => {
        // Change URL to first chatroom if path is /chatrooms
        if (currentChatroom === "") {
          this.setCurrentChatroom(res[0].name);
        }
        else {
          this.setCurrentChatroom(currentChatroom);
        }
        this.setState({ chatrooms: res, isLoading: false })
      })
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

  // Use socket API to broadcast a message event
  handleSendMessage = (message) => {
    this.setState({
      message: message
    });
    return socketSendMessage({
      messageInfo: message,
      chatroom: this.state.currentChatroom
    });
  }

  // Use socket API to have a user join a specific chatroom
  handleJoinChatroom = (chatroom) => {
    this.setState({
      currentChatroom: chatroom
    });
    return socketConnectToChatroom({ name: chatroom, user: this.state.user });
  }

  setCurrentChatroom = (chatroom) => {
    this.setState({
      currentChatroom: chatroom
    });
    return this.props.history.push(`/chatrooms/${chatroom}`);
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
      console.log(this.state.currentChatroom);
      return (
        <ChatContainer>
          <ChatMenu user={this.state.user} currentChatroom={this.state.currentChatroom} chatrooms={this.state.chatrooms} joinChatroom={this.handleJoinChatroom} />
          <ChatWindow>
            <Anchor onClick={this.logoutUser}>Logout</Anchor>
            <Route path="/chatrooms/:chatroomName" render={routeProps => (
              <ChatMessages user={this.state.user} {...routeProps} />
            )}/>
            <ChatBox message={this.handleSendMessage} user={this.state.user}/>
          </ChatWindow>
        </ChatContainer>
      )
    }
  }
}

export default Chatroom

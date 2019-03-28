import React, { Component } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import Loader from "../loader";
import Navbar from "../navbar";
import styled from "styled-components";
import styles from "../styles";
import { socketSendMessage, socketAppendMessage, socketConnectToChatroom } from "../../api/socketAPI";

import ChatNav from "./chatnav";
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
    isLoading: true,
    isAuthenticated: true
  }

  componentDidMount() {
    // Run fetchUser to get user object from database
    this.fetchUser()
      .then(res => {
        console.log(res);
        if (res.isAuthenticated) {
          this.setState({ user: res.user });
        }
        else {
          this.setState({
            isAuthenticated: false
          });
        }
      })
      .catch(err => console.log(err));

    // Run fetchChatrooms to get all chatrooms for user
    this.fetchChatrooms()
      .then(res => {
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
    const response = await fetch('/api/get/chatrooms');
    const chatrooms = await response.json();
    // Get the trailing pathname
    const currentPath = this.props.location.pathname.substring("11");

    if (response.status !== 200) throw Error("Error: Couldn't fetch chatrooms.");

    if (chatrooms.length) {
      if (currentPath === "") {
        this.setCurrentChatroom(chatrooms[0].chatroomName);
      }
      else {
        this.setCurrentChatroom(currentPath);
      }
      return chatrooms;
    }
    else {
      this.setCurrentChatroom("");
      return [];
    }
  }

  // Log the user out
  logoutUser = async () => {
    const response = await fetch('/api/logout');
    const body = await response.json();

    if (response.status !== 200) throw Error("Error: Couldn't log user out.");
    console.log("Logging user out...");
    if (body) {
      this.setState({
        isAuthenticated: false
      });
    }
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

  handleUpdateChatrooms = (chatroom) => {
    this.setState({
      chatrooms: [...this.state.chatrooms, chatroom]
    });
  }

  // Set current chatroom in URL
  setCurrentChatroom = (chatroom) => {
    this.setState({
      currentChatroom: chatroom
    });
    socketConnectToChatroom({ name: chatroom, user: this.state.user });
    return this.props.history.push(`/chatrooms/${chatroom}`);
  }

  render() {
    console.log(`Rendering chatrooms`);
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
    else if (!this.state.isAuthenticated) {
      console.log("Redirecting to home");
      return (
        <Redirect to="/" />
      )
    }
    else {
      return (
        <ChatContainer>
          <ChatMenu user={this.state.user} currentChatroom={this.state.currentChatroom} chatrooms={this.state.chatrooms} joinChatroom={this.handleJoinChatroom} updateChatrooms={this.handleUpdateChatrooms} />
          {this.state.chatrooms.length > 0 ? (
            <ChatWindow>
              <ChatNav logoutUser={this.logoutUser} user={this.state.user} />
              <Route path="/chatrooms/:chatroomName" render={() => (
                <ChatMessages user={this.state.user} />
              )}/>
              <ChatBox message={this.handleSendMessage} user={this.state.user}/>
            </ChatWindow>
          ) : (
            <ChatWindow>
              <ChatNav logoutUser={this.logoutUser} user={this.state.user} />
            </ChatWindow>
          )}
        </ChatContainer>
      )
    }
  }
}

export default Chatroom

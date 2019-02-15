import React, { Component } from "react";
import styled from "styled-components";
import styles from "../styles";
import { socketSendMessage, socketAppendMessage } from "../../api/socketAPI";

import ChatBox from "./chatbox";
import ChatMenu from "./chatmenu";
import ChatMessages from "./chatmessages";
import ChatWindow from "./chatwindow";

const ChatContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
`

class Chat extends Component {
  state = {
    message: [],
    user: {}
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
      chatrooms: this.props.chatrooms
    });
  }

  // Use socket API to broadcast a message event
  sendMessage = (message) => {
    this.setState({
      message: message
    });
    return socketSendMessage(message);
  }

  render() {
    return (
      <ChatContainer>
        <ChatMenu user={this.props.user} chatrooms={this.props.chatrooms} />
        <ChatWindow>
          {this.props.children}
          <ChatMessages user={this.props.user} />
          <ChatBox message={this.sendMessage} user={this.props.user}/>
        </ChatWindow>
      </ChatContainer>
    )
  }
}

export default Chat

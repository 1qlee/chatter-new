import React from "react";
import styled from "styled-components";
import styles from "./styles";
import { sendMessage } from "../api/api";

import ChatBox from "./chatbox";
import ChatMenu from "./chatmenu";
import ChatMessages from "./chatmessages";
import ChatWindow from "./chatwindow";

const ChatContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
`

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      message: null
    }
    this.send = this.send.bind(this);
  }

  send(data) {
    return sendMessage(data);
  }

  render() {
    return (
      <ChatContainer>
        <ChatMenu />
        <ChatWindow>
          {this.props.children}
          <ChatMessages />
          <ChatBox message={this.send}/>
        </ChatWindow>
      </ChatContainer>
    )
  }
}

export default Chat

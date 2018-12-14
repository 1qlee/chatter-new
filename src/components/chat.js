import React from "react";
import styled from "styled-components";
import Chatbox from "./chatbox"
import { sendMessage } from "../api/api";

const ChatRoom = styled.div`
  position: relative;
  border: 1px solid black;
  height: calc(100vh - 2rem);
  margin: 1rem;
`

class Chat extends React.Component {
  constructor(props) {
    super(props);
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
      <ChatRoom>
        <Chatbox sendMessage={this.send}/>
      </ChatRoom>
    )
  }
}

export default Chat

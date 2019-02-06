import React, { Component } from "react";
import styled from "styled-components";
import styles from "../styles";
import { socketAppendMessage } from "../../api/socketAPI";

const ChatMessagesContainer = styled.div`
  border: 1px solid ${styles.white.normal};
  height: calc(100% - 75px);
  width: 100%;
`

class ChatMessages extends Component {
  state = {
    messages: []
  }

  componentDidMount() {
    socketAppendMessage();
  }

  render() {
    return (
      <ChatMessagesContainer />
    )
  }
}

export default ChatMessages

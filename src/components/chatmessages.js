import React, { Component } from "react";
import styled from "styled-components";
import styles from "./styles";

const ChatMessagesContainer = styled.div`
  border: 1px solid ${styles.white.normal};
  height: calc(100% - 75px);
  width: 100%;
`

class ChatMessages extends Component {
  render() {
    return (
      <ChatMessagesContainer />
    )
  }
}

export default ChatMessages

import React, { Component } from "react";
import styled from "styled-components";
import styles from "../styles";

const ChatWindowContainer = styled.div`
  width: 100%;
`

class ChatWindow extends Component {
  render() {
    return (
      <ChatWindowContainer>
        {this.props.children}
      </ChatWindowContainer>
    )
  }
}

export default ChatWindow

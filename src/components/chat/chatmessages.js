import React, { Component } from "react";
import styled from "styled-components";
import styles from "../styles";
import { socketAppendMessage } from "../../api/socketAPI";

const ChatMessagesContainer = styled.div`
  border: 1px solid ${styles.white.normal};
  height: calc(100% - 100px);
  padding: 1rem;
  overflow-y: auto;
  width: 100%;
`

const Message = styled.div`
  background-color: ${styles.background.light};
  border-radius: 20px;
  clear: left;
  float: left;
  line-height: 1.2;
  margin-bottom: 3px;
  margin-left: auto;
  max-width: 60%;
  padding: 0.5rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  &.current-user {
    background-color: ${styles.mint};
    float: right;
    clear: right;
  }
`

class ChatMessages extends Component {
  state = {
    messages: []
  }

  componentDidMount() {
    // When a socket emits a message, call the function appendMessage to add the message to state
    socketAppendMessage(this.appendMessage);
  }

  // Function to add messages to state as they come in
  appendMessage = (message) => {
    this.setState({
      messages: [...this.state.messages, message]
    });
    console.log(this.state.messages);
  }

  render() {
    return (
      <ChatMessagesContainer>
        {this.state.messages.map((message, index) => {
          if (message.username === this.props.user.username) {
            return (
              <Message key={index} className="current-user">
                <p>{message.text}</p>
              </Message>
            )
          }
          else {
            return (
              <Message key={index}>{message.text}</Message>
            )
          }
        })}
      </ChatMessagesContainer>
    )
  }
}

export default ChatMessages

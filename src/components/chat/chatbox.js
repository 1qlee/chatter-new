import React, { Component } from "react";
import styled from "styled-components";
import styles from "../styles";

const ChatBoxContainer = styled.div`
  border: 1px solid ${styles.white.normal};
  width: 100%;
  input {
    background-color: ${styles.background.light};
    border: none;
    color: ${styles.white.normal};
    padding: 1rem;
    width: 100%;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${styles.white.light};
    }
  }
`

class ChatBox extends Component {
  state = {
    message: "",
    username: null,
    userId: null,
    roomId: null
  }

  componentDidMount() {
    this.setState({
      username: this.props.user.username,
      userId: this.props.user.userId
    });
  }

  // Update message value in state on input change
  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  // Handle sending of a message
  handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      // If message is not empty, send message object to props function 'message'
      // Then set message state value to empty
      if (this.state.message.length) {
        this.props.message({
          creator_id: this.state.userId,
          roomId: 1,
          username: this.state.username,
          timestamp: new Date().toLocaleTimeString(),
          text: this.state.message
        });
        this.setState({ message: "" });
      }
      else {
        console.error("Empty input!");
      }
    }
  }

  render() {
    return (
      <ChatBoxContainer>
        <input
          value={this.state.message}
          onKeyUp={this.handleKeyUp}
          onChange={this.handleChange}
          placeholder="Type a message..."
          />
      </ChatBoxContainer>
    )
  }
}

export default ChatBox

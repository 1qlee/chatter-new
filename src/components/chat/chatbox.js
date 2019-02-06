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
    console.log(this.props.user);
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  handleKeyUp = (e) => {
    if (e.key === 'Enter') {
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
          placeholder="Send a message"
          />
      </ChatBoxContainer>
    )
  }
}

export default ChatBox

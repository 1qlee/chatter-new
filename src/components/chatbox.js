import React, { Component } from "react";
import styled from "styled-components";
import styles from "./styles";

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
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      if (this.state.message.length) {
        this.props.message({
          userId: 1,
          roomId: 1,
          timestamp: new Date(),
          text: this.state.message
        })
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

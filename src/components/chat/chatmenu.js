import React, { Component } from "react";
import styled from "styled-components";
import styles from "../styles";
import { Button } from "../button";
import { Form, FormGroup, Input } from "../form";

const Menu = styled.div`
  width: 300px;
`

const Room = styled.div`
  padding: 1rem;
  color: ${styles.white.normal};
  text-transform: capitalize;
  border: 1px solid ${styles.white.normal};
`

class ChatMenu extends Component {
  state = {
    showForm: false,
    chatroomName: "",
    chatrooms: [],
    user: {}
  }

  componentDidMount = () => {
    this.setState({
      user: this.props.user,
      chatrooms: this.props.chatrooms
    });
    console.log(this.props.chatrooms);
  }

  // Open and close the add/create chatroom menu
  handleClick = (e) => {
    e.preventDefault();
    // Toggle the menu's state
    this.setState({
      showForm: !this.state.showForm
    });
  }

  // Submit chatroom name form
  handleSubmit = async e => {
    e.preventDefault();
    // Post the chatroom's name to server
    const response = await fetch('/api/create/chatroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatroomName: this.state.chatroomName, userId: this.state.user.userId }),
    });
    const newChatroom = await response.json();
    console.log(newChatroom);

    // If successful, add newly created chatroom name to state
    if (newChatroom) {
      this.setState({
        chatrooms: [...this.state.chatrooms, newChatroom]
      });
    }
  }

  // Update the chatroom name each time the input is changed
  handleInput = (e) => {
    this.setState({
      chatroomName: e.target.value
    });
  }

  render() {
    return (
      <Menu>
        <Button onClick={this.handleClick}>New Chat</Button>
        {this.state.showForm ? (
          <Form onSubmit={this.handleSubmit} id="create-chatroom">
            <Input onKeyUp={this.handleInput} placeholder="Enter a server name"></Input>
          </Form>
        ) : (
          null
        )}
        {this.state.chatrooms.map((chatroom, index) => (
          <Room key={index}>{chatroom.name}</Room>
        ))}
      </Menu>
    )
  }
}

export default ChatMenu

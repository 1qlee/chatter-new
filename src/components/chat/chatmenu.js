import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "../styles";
import { socketConnectToChatroom } from "../../api/socketAPI";
import { Button } from "../button";
import { Form, FormGroup, Input } from "../form";

const Menu = styled.div`
  width: 300px;
`

const Room = styled.div`
  border: 1px solid ${styles.white.normal};
  color: ${styles.white.normal};
  display: block;
  padding: 1rem;
  text-transform: capitalize;
  &.is-active {
    color: ${styles.mint};
  }
  &:hover {
    background-color: ${styles.background.border};
    cursor: pointer;
  }
`

class ChatMenu extends Component {
  state = {
    showForm: false,
    chatroomName: "",
    chatrooms: [],
    currentChatroom: "",
    user: {}
  }

  componentDidMount = () => {
    this.setState({
      user: this.props.user,
      chatrooms: this.props.chatrooms,
      currentChatroom: this.props.currentChatroom
    });
  }

  // Open and close the add/create chatroom menu
  handleToggleChatroomInput = (e) => {
    e.preventDefault();
    // Toggle the menu's state
    this.setState({
      showForm: !this.state.showForm
    });
  }

  // Submit chatroom name form
  handleCreateChatroom = async e => {
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

    // If successful, add newly created chatroom name to state
    // !!!!!!!!!!!!!!!!!!!! THIS NEEDS MORE LOGIC -> NEEDS INPUT VALIDATION SERVER-SIDE !!!!!!!!!!!!!!!!!!!
    if (newChatroom) {
      this.setState({
        chatrooms: [...this.state.chatrooms, newChatroom]
      });
    }
  }

  // Update the chatroom name each time the input is changed
  handleNameChatroom = (e) => {
    this.setState({
      chatroomName: e.target.value
    });
  }

  // Go to a chatroom on Room click
  handleJoinChatroom = (e) => {
    // Set currentChatroom in state to equal the room that was clicked
    this.setState({
      currentChatroom: e.target.innerHTML
    });
    return this.props.joinChatroom(e.target.dataset.name);
  }

  render() {
    return (
      <Menu>
        <Button onClick={this.handleToggleChatroomInput}>New Chat</Button>
        {this.state.showForm ? (
          <Form onSubmit={this.handleCreateChatroom} id="create-chatroom">
            <Input onKeyUp={this.handleNameChatroom} placeholder="Enter a server name"></Input>
          </Form>
        ) : (
          null
        )}
        {this.state.chatrooms.map((chatroom, index) => (
          <Link to={`/chatrooms/${chatroom.name}`} key={index}>
            {(this.state.currentChatroom === chatroom.name) ? (
              <Room onClick={this.handleJoinChatroom} data-name={chatroom.name} className="is-active">
                {chatroom.name}
              </Room>
            ) : (
              <Room onClick={this.handleJoinChatroom} data-name={chatroom.name}>
                {chatroom.name}
              </Room>
            )}
          </Link>
        ))}
      </Menu>
    )
  }
}

export default ChatMenu

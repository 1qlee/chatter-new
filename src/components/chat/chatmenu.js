import React, { Component, Fragment } from "react";
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
  color: ${styles.white.normal};
  display: block;
  padding: 1rem;
  text-transform: capitalize;
  &.is-active {
    background-color: ${styles.mint};
    color: ${styles.text};
  }
  &:hover {
    &:not(.is-active) {
      background-color: ${styles.background.border};
      cursor: pointer;
    }
  }
`

class ChatMenu extends Component {
  state = {
    showForm: false,
    newChatroomName: "",
    existingChatroomId: "",
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

  // Create a new chatroom
  handleCreateChatroom = async e => {
    e.preventDefault();
    // Post the chatroom's name to server
    const response = await fetch('/api/create/chatroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatroomName: this.state.newChatroomName, userId: this.state.user.userId }),
    });
    const newChatroom = await response.json();

    // If successful, add newly created chatroom name to state
    // !!!!!!!!!!!!!!!!!!!! THIS NEEDS MORE LOGIC -> NEEDS INPUT VALIDATION SERVER-SIDE !!!!!!!!!!!!!!!!!!!
    if (newChatroom) {
      this.setState({
        chatrooms: [...this.state.chatrooms, newChatroom]
      });
      return this.props.updateChatrooms(newChatroom);
    }
  }

  // Join an existing chatroom
  handleJoinExistingChatroom = async e => {
    e.preventDefault();
    // Post the chatroom's name to server
    const response = await fetch('/api/join/chatroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatroomId: this.state.existingChatroomId, userId: this.state.user.userId })
    });
    const joinChatroom = await response.json();

    console.log(joinChatroom);
  }

  // Record and set new chatroom name in state
  handleNewChatroomInput = (e) => {
    this.setState({
      newChatroomName: e.target.value
    });
  }

  // Record and set existing chatroom name in state
  handleExistingChatroomInput = (e) => {
    this.setState({
      existingChatroomId: e.target.value
    });
  }

  // Go to a chatroom on Room click
  handleGoToChatroom = (e) => {
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
          <Fragment>
            <Form onSubmit={this.handleCreateChatroom} id="create-chatroom">
              <Input onKeyUp={this.handleNewChatroomInput} placeholder="Create new chatroom" type="text"></Input>
            </Form>
            <Form onSubmit={this.handleJoinExistingChatroom} id="existing-chatroom">
              <Input onKeyUp={this.handleExistingChatroomInput} placeholder="Join existing chatroom" type="number"></Input>
            </Form>
          </Fragment>
        ) : (
          null
        )}
        {this.state.chatrooms.map((chatroom, index) => (
          <Link to={`/chatrooms/${chatroom.name}`} key={index}>
            {(this.state.currentChatroom === chatroom.name) ? (
              <Room onClick={this.handleGoToChatroom} data-name={chatroom.name} className="is-active">
                {chatroom.name}
              </Room>
            ) : (
              <Room onClick={this.handleGoToChatroom} data-name={chatroom.name}>
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

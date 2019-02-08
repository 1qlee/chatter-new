import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "../button";

const Menu = styled.div`
  width: 300px;
`

class ChatMenu extends Component {
  state = {
    showForm: false
  }

  createChatroom = async () => {
    const response = await fetch('/api/chatroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  })
    });
  }

  handleClick = (e) => {
    e.preventDefault;
    this.setState({
      showForm: true ? false : true
    })
  }

  render() {
    return (
      <Menu>
        <Button onClick={this.handleClick}>New Chat</Button>
      </Menu>
    )
  }
}

export default ChatMenu

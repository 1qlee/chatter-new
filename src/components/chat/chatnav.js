import React, { Component } from "react";
import Anchor from "../anchor";
import styled from "styled-components";
import styles from "../styles";

const ChatNavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NavInner = styled.div`
  display: flex;
  align-items: center;
`

const NavLink = styled.div`
  padding: 1rem;
`

const NavProfile = styled.div`
  background-color: ${styles.white.normal};
  padding: 1rem;
`

class ChatNav extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    this.setState({
      user: this.props.user
    })
  }

  render() {
    return (
      <ChatNavContainer>
        <NavInner>
        </NavInner>
        <NavInner>
          <NavLink>
            <Anchor onClick={this.props.logoutUser}>Logout</Anchor>
          </NavLink>
          <NavProfile>
            {this.state.user.username}
          </NavProfile>
        </NavInner>
      </ChatNavContainer>
    )
  }
}

export default ChatNav

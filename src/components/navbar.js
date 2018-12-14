import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  padding: 1rem;
  ul {
    display: flex;
    list-style-type: none;
  }
`

class Navbar extends React.Component {
  render() {
    return (
      <Nav>
        <ul>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
          <li>Four</li>
        </ul>
      </Nav>
    )
  }
}

export default Navbar;

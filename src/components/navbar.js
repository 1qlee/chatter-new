import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import styles from "./styles";

const Nav = styled.nav`
  padding: 2rem 0;
  ul {
    display: flex;
    list-style-type: none;
  }
`

const NavItem = styled.li`
  a {
    color: ${styles.white.light};
    padding: 1rem;
    &:hover {
      color: ${styles.mint};
    }
  }
`

class Navbar extends React.Component {
  render() {
    return (
      <Nav>
        <ul>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/about">About</Link>
          </NavItem>
          <NavItem>
            <Link to="/dashboard">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to="/something">Something</Link>
          </NavItem>
        </ul>
      </Nav>
    )
  }
}

export default Navbar;

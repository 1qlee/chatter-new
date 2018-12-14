import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";

export default class Dashboard extends Component {
  state = {
    isAuthenticated: this.props.isAuthenticated
  };

  render() {
    if (this.props.isAuthenticated) {
      return (
        <div>
          <ul>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
          {this.state.isAuthenticated ? (
            <h1>Authenticated</h1>
          ) : (
            <h1>Not</h1>
          )}
        </div>
      )
    }
    else {
      return (
        <Redirect to={{
          pathname: "/"
        }} />
      )
    }
  }
}

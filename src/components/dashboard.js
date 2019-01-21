import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import Anchor from "./anchor";

export default class Dashboard extends Component {
  state = {
    isAuthenticated: true,
    user: {}
  };

  componentDidMount() {
    this.fetchUser()
      .then(res => this.setState({ user: res.user }))
      .catch(err => console.log(err));
  }

  fetchUser = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error("Something went wrong with the request.");

    return body;
  };

  logoutUser = async () => {
    const response = await fetch('/api/logout');
    const body = await response.json();

    if (response.status !== 200) throw Error("Something went wrong with the request.");

    console.log(body.isAuthenticated);

    this.setState({
      isAuthenticated: body.isAuthenticated
    });
  }

  render() {
    if (this.state.user && this.state.isAuthenticated) {
      return (
        <div>
          <ul>
            <li>
              <Anchor onClick={this.logoutUser}>Logout</Anchor>
            </li>
          </ul>
          <h1>Hello {this.state.user.username}</h1>
        </div>
      )
    }
    else {
      if (this.state.isAuthenticated) {
        return (
          <div>
          </div>
        )
      }
      else {
        return <Redirect to="/" />
      }
    }
  }
}

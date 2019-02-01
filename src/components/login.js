import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { Button } from "./button";
import { Form, FormGroup, Input } from "./form";
import Content from "./content";
import Notification from "./notification";
import styled from "styled-components";
import styles from "./styles";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
    });
    if (response.status === 401 || response.status === 400) {
      this.setState({
        error: "Invalid username or password"
      });

      return this.props.authenticateUser(false);
    }
    else if (response.status === 200) {
      const body = await response.json();
      const { isAuthenticated } = body;

      return this.props.authenticateUser(isAuthenticated);
    }
    else {
      this.setState({
        error: "Something went wrong"
      });
    }
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      error: ""
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.error ? (
          <Notification error="red">
            {this.state.error}
          </Notification>
        ): (
          null
        )}
        <Form onSubmit={this.handleSubmit} id="login">
          <Content>
            <h1>Log In</h1>
          </Content>
          <FormGroup>
            <label htmlFor="username-login-input">Username</label>
            <Input id="username-login-input" type="text" name="username" autoComplete="off" onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password-login-input">Password</label>
            <Input id="password-login-input" type="password" name="password" autoComplete="new-password" onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <FormGroup>
            <Button className="is-fullwidth" background={styles.mint} color={styles.text} type="submit" form="login">Log In</Button>
          </FormGroup>
        </Form>
      </Fragment>
    )
  }
};

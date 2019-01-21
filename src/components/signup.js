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
    error: '',
    username: '',
    password: '',
    responseToPost: []
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
    });
    const body = await response.json();
    // Show any errors
    if (body[0] === "Error") {
      body.shift();
      this.setState({ responseToPost: body, error: true });
      return this.props.authenticateUser(false);
    }
    else {
      if (body.isAuthenticated) {
        this.setState({ responseToPost: body.userId, error: false });
        return this.props.authenticateUser(true);
      }
    }
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      responseToPost: ""
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.responseToPost.length > 0 ? (
          <Notification error={this.state.error}>
            {this.state.responseToPost.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </Notification>
        ) : (
          null
        )}
        <Form onSubmit={this.handleSubmit} id="signup">
          <Content>
            <h1>Sign Up</h1>
          </Content>
          <FormGroup>
            <label>Username</label>
            <Input type="text" name="username" autoComplete="off" onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <FormGroup>
            <label>Password</label>
            <Input type="password" name="password" autoComplete="new-password" onChange={this.handleChange.bind(this)} />
          </FormGroup>
          <FormGroup>
            <Button className="is-fullwidth" background={styles.mint} color={styles.text} type="submit" form="signup">Sign Up</Button>
          </FormGroup>
        </Form>
      </Fragment>
    )
  }
}

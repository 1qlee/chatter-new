import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import styles from "../components/styles";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Main, MainContent } from "../components/main";
import { Title, Subtitle } from "../components/title";
import Alert from "../components/alert";
import Anchor from "../components/anchor";
import Container from "../components/container"
import Content from "../components/content";
import Chatroom from "../components/chat/chatroom";
import Dashboard from "../components/dashboard";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import Login from "../components/login";
import Signup from "../components/signup";

import './app.css';

export default class App extends Component {
  state = {
    isAuthenticated: false,
    user: {},
    username: "",
    showLogin: false
  }

  componentDidMount() {
    this.fetchUser()
      .then(res => this.setState({ isAuthenticated: res.isAuthenticated, user: res.user }))
      .catch(err => console.log(err));
  }

  // Function to see if the user is currently logged in or not
  fetchUser = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error("Something went wrong when trying to contact the server.");

    return body;
  }

  changeForm = () => {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  authenticateUser = (value) => {
    this.setState({
      isAuthenticated: value
    });
  }

  render() {
    return (
      <Main>
        <Router>
          <Switch>
            <Route exact path="/" render={() => (
              <Container>
                <Navbar />
                <Hero>
                  <MainContent>
                    <Content>
                      <Title color={styles.grey.dark} backgroundColor={styles.mint}>chatwick</Title>
                      <Subtitle color={styles.white.light}>A real-time chat application for fast and easy interaction with your friends, family, or whoever.</Subtitle>
                    </Content>
                  </MainContent>
                  {this.state.isAuthenticated ? (
                    <Redirect to={{pathname: '/chatrooms', state: {isLoggedIn: false}}} />
                  ) : (
                  <MainContent>
                    {this.state.showLogin ? (
                      <Fragment>
                        <Login authenticateUser={this.authenticateUser} />
                        <Alert>Don't have an account? <Anchor onClick={this.changeForm}>Sign Up</Anchor></Alert>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Signup authenticateUser={this.authenticateUser} />
                        <Alert>Already have an account? <Anchor onClick={this.changeForm}>Log In</Anchor></Alert>
                      </Fragment>
                    )}
                  </MainContent>
                  )}
                </Hero>
              </Container>
            )}/>
            <Route path="/chatrooms" render={routeProps => (
              this.state.isAuthenticated ? (
                <Chatroom {...routeProps} />
              ) : (
                <Redirect to='/' />
              )
            )}/>
            <Route render={() => (
              <h1>404</h1>
            )} />
          </Switch>
        </Router>
      </Main>
    )
  }
}

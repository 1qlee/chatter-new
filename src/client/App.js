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
import Dashboard from "../components/dashboard";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import Login from "../components/login";
import Signup from "../components/signup";

import './app.css';

export default class App extends Component {
  state = {
    isAuthenticated: null,
    username: "",
    showLogin: false
  }

  componentDidMount() {
    this.fetchUser()
      .then(res => this.setState({ isAuthenticated: res.isAuthenticated }))
      .catch(err => console.log(err));
  }

  fetchUser = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error("Something went wrong when trying to contact the server.");

    return body;
  }

  changeForm() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  authenticateUser(value) {
    this.setState({
      isAuthenticated: value
    });
  }

  render() {
    if (this.state.isAuthenticated === null) {
      return (
        <Main>
        </Main>
      )
    }
    return (
      <Main>
        <Router>
          <Switch>
            <Route exact={true} path="/" render={() => (
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
                    <Redirect to={{pathname: '/dashboard'}} />
                  ) : (
                  <MainContent>
                    {this.state.showLogin ? (
                      <Fragment>
                        <Login authenticateUser={this.authenticateUser.bind(this)} />
                        <Alert>Don't have an account? <Anchor onClick={this.changeForm.bind(this)}>Sign Up</Anchor></Alert>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Signup authenticateUser={this.authenticateUser.bind(this)} />
                        <Alert>Already have an account? <Anchor onClick={this.changeForm.bind(this)}>Log In</Anchor></Alert>
                      </Fragment>
                    )}
                  </MainContent>
                  )}
                </Hero>
              </Container>
            )}/>
            <Route path="/dashboard" render={() => (
              this.state.isAuthenticated ? (
                <Dashboard />
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

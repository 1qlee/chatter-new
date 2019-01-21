import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import {Main, MainContainer, MainContent} from "../components/main";
import Chat from '../components/chat';
import Dashboard from "../components/dashboard";
import Login from "../components/login";
import Signup from "../components/signup";
import Alert from "../components/alert";
import Content from "../components/content";
import Anchor from "../components/anchor";
// Styles
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
              <MainContainer>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                </ul>
                <MainContent>
                  <Content>
                    <h1>chatwick</h1>
                    <p>The best way to talk in chatrooms.</p>
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
              </MainContainer>
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

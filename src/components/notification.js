import React, { Component } from "react";
import styled from "styled-components";

const Popup = styled.div`
  background-color: ${props => props.color};
  color: #fff;
  border-radius: 5px;
  padding: 1rem;
  position: absolute;
  top: 1rem;
  z-index: 99;
`

class Notification extends Component {
  state = {
    color: this.props.error ? "red" : "green"
  };

  render() {
    return (
      <Popup color={this.state.color}>
        {this.props.children}
      </Popup>
    )
  };
}

export default Notification;

import React from "react";
import styled from "styled-components";

const Input = styled.input`
  border-radius: 3px;
  border-left: 1px solid black;
  border-top: 1px solid black;
  position: absolute;
  bottom: 0;
  left: 300px;
  width: calc(100% - 300px);
  padding: 1rem;
`

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onChange = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  onKeyUp = (event) => {
    if (event.key === 'Enter') {
      if (this.state.message.length) {
        this.props.sendMessage({
          userId: 1,
          roomId: 1,
          timestamp: new Date(),
          text: this.state.message
        })
        this.setState({ message: "" });
      }
      else {
        console.error("Empty input!");
      }
    }
  }

  render() {
    return (
      <Input
        value={this.state.message}
        onKeyUp={this.onKeyUp}
        onChange={this.onChange}
      />
    )
  }
}

export default Chatbox

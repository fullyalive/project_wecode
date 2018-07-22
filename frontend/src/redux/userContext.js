import React, { Component, createContext } from "react";

const userContext = createContext();

const { Provider, Consumer: UserConsumer } = userContext;

class UserProvider extends Component {
  state = {
    value: "None"
  };

  actions = {
    setValue: value => {
      this.setState({ value });
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, UserConsumer };

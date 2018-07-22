import React from "react";

export const UserContext = React.createContext();

export class UserProvider extends React.Component {
  state = {
    Id: "",
    profile_image: "",
    username: ""
  };
  render() {
    return (
      <UserContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

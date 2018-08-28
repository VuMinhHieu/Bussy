import React, {Component} from "react";
import logo from "../logo.svg";
import "../App.css";
import {connect} from "react-redux";

class Login extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Your login status <code>{this.props.loginStatus ? "Logged in" : "Not logged in"}</code>
        </p>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loginStatus: state.login.loginStatus,
  }
}
export default connect(mapStateToProps)(Login);
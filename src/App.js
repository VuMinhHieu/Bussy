import React, { Component } from 'react';
import createStore from "./Store";
import { Provider } from "react-redux";
import LoginScreen from "./Screens/Login";

const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoginScreen/>
      </Provider>
    );
  }
}
export default App;

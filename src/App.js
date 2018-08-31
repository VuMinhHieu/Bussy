import React, { Component } from 'react';
import createStore from "./Store";
import { Provider } from "react-redux";

import LoginScreen from "./Screens/Login";
import SearchScreen from "./Screens/Search";

const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SearchScreen/>
      </Provider>
    );
  }
}
export default App;

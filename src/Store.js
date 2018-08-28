import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import RootReducer from "./reducers/RootReducer";

const middleware = applyMiddleware(thunk);
export default (initialState = {}) =>  createStore(
    RootReducer,
    initialState,
    middleware
)
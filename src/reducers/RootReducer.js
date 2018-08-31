import { combineReducers } from 'redux';
import { LoginReducer as login } from "./LoginReducer";
import { SearchReducer as search } from "./SearchReducer";

export default
combineReducers({
  login,
  search
});
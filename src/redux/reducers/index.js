import loggedReducer from "./isLogged";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: loggedReducer
})

export default rootReducer;

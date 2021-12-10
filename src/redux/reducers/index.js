import authReducer from "./auth";
import gamesReducer from "./games";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: authReducer,
  games: gamesReducer
})

export default rootReducer;

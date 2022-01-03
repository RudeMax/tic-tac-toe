import { combineReducers } from "redux";
import gameReducer from "./GameReducer";

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import itemReducer from "./itemReducer";

// rootReducer
export default combineReducers({
  item: itemReducer
})
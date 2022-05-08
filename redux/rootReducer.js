import { combineReducers } from "redux";
import authReducer from "../redux/reducers/authReducer";
import todosReducer from "./reducers/todosReducer"
import userReducer from "../redux/reducers/userReducer"
import errorReducer from "./reducers/errorReducer";


export const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
  user: userReducer,
  error: errorReducer
});

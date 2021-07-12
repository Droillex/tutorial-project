import { combineReducers, createStore, applyMiddleware } from "redux";
import messageReducer from "./messageReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import headerReducer from "./headerReducer";
import thunkMiddleware from "redux-thunk";
import appReducer from "./appReducer";
import modalReducer from "./modalReducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messageReducer,
  usersPage: usersReducer,
  auth: authReducer,
  header: headerReducer,
  app: appReducer,
  modal: modalReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;

import { setCookie } from "../../utils/cookie";

import {
  SET_AUTH_USER,
  SET_TOKEN,
  SET_SOCKET,
  CLEAR_AUTH_USER,
} from "../actionTypes";

const initialState = {
  user: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_TOKEN:
      return (
        {
          ...state,
        },
        setCookie("token", action.payload)
      );
    case CLEAR_AUTH_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;

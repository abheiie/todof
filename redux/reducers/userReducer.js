import { SET_USER, CLEAR_USER, LOADING_USER } from "../actionTypes";

const initialState = {
  user: {},
  loading:false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case CLEAR_USER:
      return (
        {
          ...state,
        },
      );
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

export default userReducer;

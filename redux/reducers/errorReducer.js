import { SET_ERROR} from "../actionTypes";

const initialState = {
  show_error:false,
  errorContent:""
};

function errorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return{
        ...state,
        show_error: action.payload.show_error,
        errorContent: action.payload.errorContent
      }
    default:
      return state;
  }
}

export default errorReducer;

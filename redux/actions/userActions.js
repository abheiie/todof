import axios from "axios";
import { SET_USER, CLEAR_USER, LOADING_USER } from "../actionTypes";
import { USER_URL } from "../../utils/urls";


//GET PARTICULAR PROFILE
export const getUser = ({id}) => async (dispatch) => {
    dispatch(startUserLoading());
    const localUrl = USER_URL+1
    const res = await axios.get(localUrl);
    if (res.statusText === "OK") {
      dispatch(setUser(res.data));
    } else {
      dispatch(clearUser());
    }
  };


//UPDATE A PARTICULAR USER
export const updateUser = ({fullName, email, about, id}) => async (dispatch) => {
  dispatch(startUserLoading());
  const localUrl = USER_URL+id
  const body = JSON.stringify({ fullName, email, about, id });
  const res =  await axios.post(localUrl,body);
  if (res.statusText === "OK") {
    dispatch(setUser(res.data));
  } else {
    dispatch(clearUser());
  }
};


// START USER LOADING
export const startUserLoading = () => async (dispatch) => {
  dispatch({
    type: LOADING_USER,
    payload: true,
  });
};

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
     payload:{}
  };
}

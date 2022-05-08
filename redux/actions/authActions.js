import axios from 'axios';
import { setCookie, deleteCookie } from '../../utils/cookie';
import {LOGIN_URL, REGISTER_URL} from '../../utils/urls';
import Router from 'next/router'
import {setError} from "../actions/errorAction"



import {
    SET_AUTH_USER,
    SET_TOKEN,
    SET_SOCKET,
    CLEAR_AUTH_USER,
} from "../actionTypes";


// LOG IN
export const logIn = ({ mobile, password }) => async (
    dispatch
  ) => {
    const body = { "mobile":mobile, "password":password }
    const res = await axios.post(`${LOGIN_URL}`,body);

    if(res.statusText == "OK"){
        dispatch(setAuthUser(res.data.user))
        setCookie('token',res.data.token )
    }else{
        dispatch(setError(res))
        dispatch(clearAuthUser())
    }
};

// REGISTER
export const register = ({ full_name, mobile, password }) => async (
    dispatch
  ) => {
    const body = { "full_name":full_name, "mobile":mobile, "password":password }
    const res = await axios.post(`${REGISTER_URL}`,body);
    if(res.statusText == "Created"){
        Router.push('/auth/login/')
        // dispatch(setAuthUser(res.data.user))
        // setCookie('token',res.data.token )
    }else{
        dispatch(clearAuthUser())
    }
};

// LOG OUT
export const logOut = () => async (
    dispatch
  ) => {
        Router.push('/auth/login/')
        deleteCookie('token')
        dispatch(clearAuthUser())
};


export function setAuthUser(user) {
    return {
        type: SET_AUTH_USER,
        payload: user,
    };
}
export function setToken(token) {
    return {
        type: SET_TOKEN,
        payload: token,
    };
}
export function clearAuthUser() {
    return {
        type: CLEAR_AUTH_USER,
        payload:null,
    };
}

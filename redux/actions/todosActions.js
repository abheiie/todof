import axios from "axios";
import { TODO_LIST,TODO_DETAIL, } from "../../utils/urls";
import { SET_TODOS, CLEAR_TODOS, LOADING_TODOS, UPDATE_TODO, DELETE_TODO, UPDATE_TODO_START, CREATE_TODO } from "../actionTypes";

//GET ALL THE PROFILES
export const getTodos = () => async (dispatch) => {
  dispatch(startTodosLoading());
  const res = await axios.get(TODO_LIST);
  if (res.statusText === "OK") {
    dispatch(setTodos(res.data));
  } else {
    dispatch(clearTodos());
  }
};

export const createTodos = ({body}) => async (dispatch) => {
  dispatch(startTodosLoading());
  const postBody = {"body":body}
  const res = await axios.post(TODO_LIST, postBody);
  if (res.statusText === "Created") {
    dispatch(createTodo(res.data));
  } else {
    dispatch(clearTodos());
  }
};

export const updateTodos = ({id, body}) => async (dispatch) => {
  dispatch(startTodoUpdating(true));
  dispatch(startTodosLoading());
  const updateUrl=TODO_DETAIL + id + "/"
  const postBody = {"body":body}
  const res = await axios.put(updateUrl, postBody);

  if (res.statusText === "Created") {
    dispatch(startTodoUpdating(false));
    dispatch(updateTodo(res.data));
  } else {
    dispatch(clearTodos());
  }
};

export const deleteTodos = ({id}) => async (dispatch) => {
  dispatch(startTodosLoading());
  const deleteUrl=TODO_DETAIL + id + "/"
  const res = await axios.delete(deleteUrl);
  if (res.statusText === "No Content") {
    dispatch(deleteTodo(id));
  } else {
    dispatch(clearTodos());
  }
};

export function startTodoUpdating(updating_value) {
  return {
    type : UPDATE_TODO_START,
    payload: updating_value

  }
}

export function updateTodo(todo) {
  return {
    type : UPDATE_TODO,
    payload: todo

  }
}

export function setTodos(todos) {
  return {
    type: SET_TODOS,
    payload: todos,
  };
}
export function clearTodos() {
  return {
    type: CLEAR_TODOS,
  };
}
export function startTodosLoading() {
  return {
    type: LOADING_TODOS,
  };
}
export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload:id
  };
}

export function createTodo(data) {
  return {
    type: CREATE_TODO,
    payload:data
  };
}





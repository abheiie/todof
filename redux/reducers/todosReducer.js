import { SET_TODOS, CLEAR_TODOS, LOADING_TODOS, UPDATE_TODO,DELETE_TODO, UPDATE_TODO_START, CREATE_TODO } from "../actionTypes";

const initialState = {
  todos: [],
  loading:null
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TODO_START:
      return{
        ...state,
      update_todo_start: action.payload
      }

    case CREATE_TODO:
      return{
        ...state,
        todos: [action.payload, ...state.todos],
        loading: false

      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
        todo.id === action.payload.id
            ? {
                ...todo,
                body: action.payload.body
              }
            : todo
        ),
        loading: false
      };
      case DELETE_TODO:
        return {
          ...state,
          todos: state.todos.filter(todo=> todo.id !==action.payload),
          loading: false
        };
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false
      };
    case CLEAR_TODOS:
      return (
        {
          ...state,
        }
      );
    case LOADING_TODOS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

export default todosReducer;

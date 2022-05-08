import { createStore, applyMiddleware,compose } from "redux";
import { rootReducer } from "./rootReducer";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';


const middlewares = [thunk ];

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middlewares),
  // other store enhancers if any
));



import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./reducer";
import postReducer from "./postReducer";
import coursesReducer from "./coursesReducer";

//export const ADRESS = "localhost";

export const ADRESS = "185.225.34.223";

const rootReducer = combineReducers({
    reducer: reducer,
    posts: postReducer,
    courses: coursesReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;

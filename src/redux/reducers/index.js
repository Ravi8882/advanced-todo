import { combineReducers } from "redux";
import { todosReducer, selectedTodosReducer } from "./todosReducer";
const reducers = combineReducers({
  allTodos: todosReducer,
  todo: selectedTodosReducer
});
export default reducers;

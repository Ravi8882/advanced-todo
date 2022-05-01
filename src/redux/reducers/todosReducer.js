import { ActionTypes } from "../constants/action-types";
const intialState = {
  todos: []
};

export const todosReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TODOS:
      return { ...state, todos: payload };
    default:
      return state;
  }
};

export const selectedTodosReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_TODO:
      return { ...state, ...payload };
    default:
      return state;
  }
};
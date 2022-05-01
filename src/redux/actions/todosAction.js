import { ActionTypes } from "../constants/action-types";
import axios from "axios";

export const fetchTodos = () => {

    return async function(dispatch, getState){
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
          .catch((err) => {
            console.log("Err: ", err);
          });
          dispatch({type:ActionTypes.SET_TODOS, payload: response.data});
    }
  };

  export const fetchProductDetail = (id) => {
    return async function(dispatch, getState){
        const response = await axios
            .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .catch((err) => {
                console.log("Err: ", err);
            });
        dispatch({type:ActionTypes.SELECTED_TODO, payload: response.data});
    }
  };



export const setTodos = (todos) => {
  return {
    type: ActionTypes.SET_TODOS,
    payload: todos
  };
};

export const selectedTodo = (todo) => {
  return {
    type: ActionTypes.SELECTED_TODO,
    payload: todo
  };
};

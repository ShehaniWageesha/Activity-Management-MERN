import { TODO,CREATE_TODO,DELETE_TODO,GET_TODO,UPDATE_TODO } from './client/endpoints';
import { Axios } from './client/index';

export const getTodos = () => {
  return Axios.get(TODO);
};
export const deleteTodo = (id) => {
  return Axios.delete(`${DELETE_TODO}/${id}`);
};
export const addTodos = (todo) => {
  return Axios.post(CREATE_TODO,todo);
};
export const getSingleTodo = (id) => {
  return Axios.get(`${GET_TODO}/${id}`);
};
export const updateTodos = (id,todo) => {
  return Axios.post(`${UPDATE_TODO}/${id}`,todo);
};

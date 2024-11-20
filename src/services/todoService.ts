import { apiClient } from '@/utils/apiClient';
import Todo from '@/mod/todo/model/Todo';

/**
 * Get all todos from server
 * @param {number} userId user id
 * @param {string} token token
 * @returns {Promise<Todo[]>} todo items
 */
export const getAllTodos = async (
  userId: number,
  token: string,
): Promise<Todo[]> => {
  const response = await apiClient(
    'GET',
    'todo',
    `${userId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    {},
  );

  const data = response.data;
  return data.map((todoData: any) => Todo.createTodoObject(todoData));
};

/**
 * Create new todo
 * @param {number} userId user id
 * @param {string} name todo name
 * @param {number} order todo order value
 * @param {string} token token
 * @returns {Promise<Todo>} created todo object
 */
export const createTodo = async (
  userId: number,
  name: string,
  order: number,
  token: string,
): Promise<Todo> => {
  const response = await apiClient(
    'POST',
    'todo',
    '',
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId, name, order },
  );

  const data = response.data;
  return Todo.createTodoObject(data);
};

/**
 * Update todo
 * @param {number} todoId todo id
 * @param {number} userId user id
 * @param {string} name todo name
 * @param {string} token token
 * @returns {Promise<Todo>} updated todo object
 */
export const updateTodo = async (
  todoId: number,
  userId: number,
  name: string,
  token: string,
): Promise<Todo> => {
  const response = await apiClient(
    'PUT',
    'todo',
    `${todoId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId, name },
  );

  const data = response.data;
  return Todo.createTodoObject(data);
};

/**
 * Remove todo
 * @param {number} todoId todo id
 * @param {number} userId user id
 * @param {string} token token
 * @returns {Promise<Todo>} removed todo object
 */
export const removeTodo = async (
  todoId: number,
  userId: number,
  token: string,
): Promise<Todo> => {
  const response = await apiClient(
    'DELETE',
    'todo',
    `${todoId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId },
  );

  const data = response.data;
  return Todo.createTodoObject(data);
};

/**
 * Change todo status
 * @param {number} todoId todo id
 * @param {number} userId user id
 * @param {boolean} isComplete new is complete value
 * @param {string} token token
 * @returns {Promise<Todo>} updated todo object
 */
export const changeStatus = async (
  todoId: number,
  userId: number,
  isComplete: boolean,
  token: string,
): Promise<Todo> => {
  const response = await apiClient(
    'POST',
    'todo',
    `changeStatus/${todoId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId, isComplete },
  );

  const data = response.data;
  return Todo.createTodoObject(data);
};

/**
 * Change todo order (reorder todo)
 * @param {number} todoId todo id
 * @param {number} userId user id
 * @param {number} order new order value
 * @param {string} token token
 * @returns {Promise<Todo>} reordered todo object
 */
export const reorderTodo = async (
  todoId: number,
  userId: number,
  order: number,
  token: string,
): Promise<Todo> => {
  const response = await apiClient(
    'POST',
    'todo',
    `reorder/${todoId}`,
    {
      Authorization: `Bearer ${token}`,
    },
    {},
    { userId, order },
  );

  const data = response.data;
  return Todo.createTodoObject(data);
};

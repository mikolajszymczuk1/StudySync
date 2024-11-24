import { apiClient } from '@/utils/apiClient';
import type { HttpResponse } from '@capacitor/core';
import RequestError from '@/mod/error/model/RequestError';
import User from '@/mod/user/model/User';

/**
 * Login user to session
 * @param {string} username username
 * @param {string} password password
 * @returns {Promise<{ user: User; token: string } | RequestError>} login data or error
 */
export const login = async (
  username: string,
  password: string,
): Promise<{ user: User; token: string } | RequestError> => {
  try {
    const response = await apiClient(
      'POST',
      'auth',
      'login',
      {},
      {},
      { username, password },
    );
    const data = response.data;
    return { user: User.createUserObject(data.user), token: data.token };
  } catch (e) {
    return e as RequestError;
  }
};

/**
 * Logout user from session
 * @returns {Promise<HttpResponse>} logout response
 */
export const logout = async (): Promise<HttpResponse> => {
  const response = await apiClient('POST', 'auth', 'logout');
  return response;
};

/**
 * Create new user
 * @param {string} username username
 * @param {string} password password
 * @param {string} repeatPassword repeat password
 * @returns {Promise<{ user: User; token: string } | RequestError>} register data or error
 */
export const register = async (
  username: string,
  password: string,
  repeatPassword: string,
): Promise<{ user: User; token: string } | RequestError> => {
  try {
    const response = await apiClient(
      'POST',
      'auth',
      'register',
      {},
      {},
      {
        username,
        password,
        repeatPassword,
      },
    );

    const data = response.data;
    return { user: User.createUserObject(data.user), token: data.token };
  } catch (e) {
    return e as RequestError;
  }
};

/**
 * Get session
 * @returns {Promise<{ user: User; token: string } | RequestError>} session data or error
 */
export const getSession = async (
  token: string,
): Promise<{ user: User; token: string } | RequestError> => {
  try {
    const response = await apiClient('GET', 'auth', 'session', {
      Authorization: `Bearer ${token}`,
    });

    const data = response.data;
    return { user: User.createUserObject(data.user), token: data.token };
  } catch (e) {
    return e as RequestError;
  }
};

/**
 * Change user data
 * @param {number} userId user id
 * @param {string} field field name [firstName, lastName]
 * @param {string} value new value for field
 * @param {string} token token
 * @returns {Promise<User | RequestError>}
 */
export const changeData = async (
  userId: number,
  field: string,
  value: string,
  token: string,
): Promise<User | RequestError> => {
  try {
    const response = await apiClient(
      'PUT',
      'user',
      'updateData',
      {
        Authorization: `Bearer ${token}`,
      },
      {},
      { userId, field, newValue: value },
    );

    const data = response.data;
    return User.createUserObject(data);
  } catch (e) {
    return e as RequestError;
  }
};

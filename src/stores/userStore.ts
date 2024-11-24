import { type Ref, ref, computed } from 'vue';
import { defineStore } from 'pinia';
import User from '@/mod/user/model/User';
import { storageGet, storageSet, storageRemove } from '@/utils/storage';
import {
  login,
  logout,
  register,
  getSession,
  changeData,
} from '@/services/userService';
import RequestError from '@/mod/error/model/RequestError';
import type { AuthStatus } from '@/types/commonTypes';
import { useSubjectStore } from '@/stores/subjectStore';
import { useEventStore } from '@/stores/eventStore';
import { useTodoStore } from '@/stores/todoStore';

export const useUserStore = defineStore('userStore', () => {
  const user: Ref<User | null> = ref(null);
  const token: Ref<string> = ref('');
  const isLoading: Ref<boolean> = ref(false);

  /**
   * Get information about user log in status
   * @returns {boolean} true if user is logged in
   */
  const isLoggedIn = computed<boolean>(() => {
    return !!user.value && token.value !== '';
  });

  /**
   * Login user and load user session
   * @param {string} username username
   * @param {string} password password
   * @returns {Promise<AuthStatus>} auth status
   */
  const loginUser = async (
    username: string,
    password: string,
  ): Promise<AuthStatus> => {
    const response = await login(username, password);
    if (response instanceof RequestError) {
      return { status: false, error: response.response.error };
    }

    user.value = response.user;
    token.value = response.token;
    storageSet('studySyncToken', token.value);

    await loadUserContent();

    return { status: true };
  };

  const logoutUser = async (): Promise<void> => {
    const response = await logout();
    if (!response) {
      return;
    }

    storageRemove('studySyncToken');
    user.value = null;
    token.value = '';
  };

  /**
   * Register user and load session
   * @param {string} username username
   * @param {string} password password
   * @param {string} repeatPassword repeat password
   * @returns {Promise<AuthStatus>} auth status
   */
  const registerUser = async (
    username: string,
    password: string,
    repeatPassword: string,
  ): Promise<AuthStatus> => {
    const response = await register(username, password, repeatPassword);
    if (response instanceof RequestError) {
      return { status: false, error: response.response.error };
    }

    user.value = response.user;
    token.value = response.token;
    storageSet('studySyncToken', token.value);

    await loadUserContent();

    return { status: true };
  };

  /**
   * Get and load user session
   * @returns {Promise<AuthStatus>} auth status
   */
  const getSessionUser = async (): Promise<AuthStatus> => {
    const storageToken = await storageGet('studySyncToken');
    if (!storageToken) {
      return { status: false };
    }

    const response = await getSession(storageToken);
    if (response instanceof RequestError) {
      return { status: false, error: response.response.error };
    }

    user.value = response.user;
    token.value = response.token;
    storageSet('studySyncToken', token.value);

    return { status: true };
  };

  /** Load all user content data */
  const loadUserContent = async (): Promise<void> => {
    const subjectStore = useSubjectStore();
    const eventStore = useEventStore();
    const todoStore = useTodoStore();
    await subjectStore.loadSubjects();
    await eventStore.loadEvents();
    await todoStore.loadItems();
  };

  /**
   * Update user base info
   * @param {string} field field name
   * @param {string} value new value for field
   */
  const changeUserData = async (
    field: string,
    value: string,
  ): Promise<void> => {
    await changeData(user.value!.id, field, value, token.value);
    await getSessionUser();
  };

  return {
    user,
    token,
    isLoading,
    isLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    getSessionUser,
    loadUserContent,
    changeUserData,
  };
});

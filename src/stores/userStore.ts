import { type Ref, ref, computed } from 'vue';
import { defineStore } from 'pinia';
import User from '@/mod/user/model/User';
import { storageGet, storageSet, storageRemove } from '@/utils/storage';
import { login, logout, register, getSession } from '@/services/userService';
import RequestError from '@/mod/error/model/RequestError';
import type { AuthStatus } from '@/types/commonTypes';

export const useUserStore = defineStore('userStore', () => {
  const user: Ref<User | null> = ref(null);
  const token: Ref<string> = ref('');

  const isLoggedIn = computed<boolean>(() => {
    return !!user.value && token.value !== '';
  });

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

    return { status: true };
  };

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

  return {
    user,
    token,
    isLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    getSessionUser,
  };
});

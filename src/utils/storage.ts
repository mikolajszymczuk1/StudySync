import { Preferences } from '@capacitor/preferences';

/**
 * Get item from storage
 * @param {string} key item key
 * @returns {Promise<string | null>} item value
 */
export const storageGet = async (key: string): Promise<string | null> => {
  const { value } = await Preferences.get({ key });
  return value;
};

/**
 * Set new value for item in storage
 * @param {string} key item key
 * @param {string} value item value
 */
export const storageSet = async (key: string, value: string): Promise<void> => {
  await Preferences.set({ key, value });
};

/**
 * Remove item from storage
 * @param {string} key item key
 */
export const storageRemove = async (key: string): Promise<void> => {
  await Preferences.remove({ key });
};

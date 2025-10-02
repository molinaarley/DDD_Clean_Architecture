// TODO: Implémenter le service de stockage avec AsyncStorage

export interface StorageService {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
  getAllKeys(): Promise<string[]>;
}

class AsyncStorageService implements StorageService {
  async getItem(key: string): Promise<string | null> {
    // TODO: Implémenter avec AsyncStorage
    // return await AsyncStorage.getItem(key);
    return null;
  }

  async setItem(key: string, value: string): Promise<void> {
    // TODO: Implémenter avec AsyncStorage
    // await AsyncStorage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    // TODO: Implémenter avec AsyncStorage
    // await AsyncStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    // TODO: Implémenter avec AsyncStorage
    // await AsyncStorage.clear();
  }

  async getAllKeys(): Promise<string[]> {
    // TODO: Implémenter avec AsyncStorage
    // return await AsyncStorage.getAllKeys();
    return [];
  }
}

// Clés de stockage communes
export const StorageKeys = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  SETTINGS: 'settings',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const storageService = new AsyncStorageService();

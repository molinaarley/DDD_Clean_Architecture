// TODO: Définir les types globaux TypeScript

declare global {
  // Variables d'environnement
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      EXPO_PUBLIC_SOCKET_URL: string;
      EXPO_PUBLIC_APP_ENV: 'development' | 'staging' | 'production';
    }
  }

  // Types pour les modules React Native
  interface Window {
    // TODO: Ajouter des propriétés globales si nécessaire
  }
}

// Types d'utilitaires
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Types pour les réponses API
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

// Types pour la navigation
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  ChatRoom: { chatId: string; recipientName: string };
  Call: { callId: string; isIncoming?: boolean };
};

export type MainTabParamList = {
  Discover: undefined;
  Messages: undefined;
  Wallet: undefined;
  Profile: undefined;
};

// Types pour les thèmes
export type Theme = 'light' | 'dark';
export type Language = 'fr' | 'en' | 'es';

// Types pour les permissions
export type PermissionStatus = 'granted' | 'denied' | 'never_ask_again';

export {};

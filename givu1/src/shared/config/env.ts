// TODO: Gérer la configuration des variables d'environnement

import Constants from 'expo-constants';

export const config = {
  // Configuration de l'API
  apiUrl: Constants.expoConfig?.extra?.apiUrl || 'https://api.givu.com',
  socketUrl: Constants.expoConfig?.extra?.socketUrl || 'wss://socket.givu.com',
  
  // Configuration de l'environnement
  environment: Constants.expoConfig?.extra?.environment || 'development',
  isDevelopment: __DEV__,
  isProduction: !__DEV__,
  
  // Configuration des fonctionnalités
  features: {
    analytics: true,
    crashReporting: true,
    pushNotifications: true,
    videoCalls: true,
    payments: true,
  },
  
  // Configuration des limites
  limits: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxMessageLength: 1000,
    maxCallDuration: 3600000, // 1 heure
  },
} as const;

export type Config = typeof config;

// TODO: Définir les constantes de l'application

export const APP_CONFIG = {
  NAME: 'GIVU',
  VERSION: '1.0.0',
  BUILD_NUMBER: '1',
} as const;

export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.givu.com',
  SOCKET_URL: process.env.EXPO_PUBLIC_SOCKET_URL || 'wss://socket.givu.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  SETTINGS: 'settings',
  THEME: 'theme',
  LANGUAGE: 'language',
  NOTIFICATIONS: 'notifications',
} as const;

export const ROUTES = {
  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  
  // Main
  MAIN_TABS: 'MainTabs',
  DISCOVER: 'Discover',
  MESSAGES: 'Messages',
  WALLET: 'Wallet',
  PROFILE: 'Profile',
  
  // Chat
  CHAT_ROOM: 'ChatRoom',
  
  // Calls
  CALL: 'Call',
} as const;

export const CALL_CONFIG = {
  ICE_SERVERS: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
  CALL_TIMEOUT: 30000, // 30 secondes
  MAX_CALL_DURATION: 3600000, // 1 heure
} as const;

export const CHAT_CONFIG = {
  MESSAGE_LIMIT: 50,
  TYPING_INDICATOR_TIMEOUT: 3000,
  MESSAGE_RETRY_ATTEMPTS: 3,
} as const;

export const MATCHMAKING_CONFIG = {
  MAX_DISTANCE: 50, // km
  MIN_AGE: 18,
  MAX_AGE: 100,
  REFRESH_INTERVAL: 30000, // 30 secondes
} as const;

export const NOTIFICATION_TYPES = {
  MESSAGE: 'message',
  CALL: 'call',
  MATCH: 'match',
  PAYMENT: 'payment',
  SYSTEM: 'system',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Vérifiez votre connexion internet.',
  AUTH_ERROR: 'Erreur d\'authentification. Veuillez vous reconnecter.',
  VALIDATION_ERROR: 'Veuillez vérifier les informations saisies.',
  SERVER_ERROR: 'Erreur du serveur. Veuillez réessayer plus tard.',
  UNKNOWN_ERROR: 'Une erreur inattendue s\'est produite.',
} as const;

// TODO: Définir la palette de couleurs de l'application

export const colors = {
  // Couleurs principales
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA6FF',
  
  // Couleurs secondaires
  secondary: '#6C757D',
  secondaryDark: '#545B62',
  secondaryLight: '#8A9199',
  
  // Couleurs de statut
  success: '#28A745',
  successDark: '#1E7E34',
  successLight: '#5CB85C',
  
  danger: '#DC3545',
  dangerDark: '#C82333',
  dangerLight: '#E74C3C',
  
  warning: '#FFC107',
  warningDark: '#E0A800',
  warningLight: '#FFD43B',
  
  info: '#17A2B8',
  infoDark: '#138496',
  infoLight: '#5BC0DE',
  
  // Couleurs neutres
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  
  // Gris
  gray50: '#F8F9FA',
  gray100: '#F1F3F4',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#6C757D',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',
  
  // Couleurs spécifiques à l'app
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#212529',
  textSecondary: '#6C757D',
  border: '#DEE2E6',
  divider: '#E9ECEF',
  
  // Couleurs pour les appels vidéo
  callBackground: '#000000',
  callOverlay: 'rgba(0, 0, 0, 0.5)',
  
  // Couleurs pour les messages
  messageBubble: '#007AFF',
  messageBubbleOther: '#F1F3F4',
  messageText: '#FFFFFF',
  messageTextOther: '#212529',
} as const;

export type ColorKey = keyof typeof colors;

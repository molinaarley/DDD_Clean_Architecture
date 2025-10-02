// TODO: Configurer l'internationalisation

export const i18n = {
  // Configuration de base
  defaultLocale: 'fr',
  locales: ['fr', 'en', 'es'],
  
  // Fonction de traduction (placeholder)
  t: (key: string, params?: Record<string, any>) => {
    // TODO: Implémenter la logique de traduction
    return key;
  },
  
  // Changer de langue
  changeLanguage: (locale: string) => {
    // TODO: Implémenter le changement de langue
    console.log('Changing language to:', locale);
  },
  
  // Obtenir la langue actuelle
  getCurrentLanguage: () => {
    // TODO: Récupérer la langue actuelle
    return 'fr';
  },
} as const;

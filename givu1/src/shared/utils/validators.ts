// TODO: Implémenter les validateurs de données

export const validators = {
  // Validation d'email
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validation de mot de passe
  password: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une majuscule');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une minuscule');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Validation de nom d'utilisateur
  username: (username: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (username.length < 3) {
      errors.push('Le nom d\'utilisateur doit contenir au moins 3 caractères');
    }
    
    if (username.length > 20) {
      errors.push('Le nom d\'utilisateur ne peut pas dépasser 20 caractères');
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.push('Le nom d\'utilisateur ne peut contenir que des lettres, chiffres et underscores');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Validation de numéro de téléphone
  phone: (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  // Validation d'URL
  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Validation d'âge
  age: (age: number): boolean => {
    return age >= 18 && age <= 100;
  },

  // Validation de chaîne non vide
  required: (value: string): boolean => {
    return value.trim().length > 0;
  },

  // Validation de longueur minimale
  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  // Validation de longueur maximale
  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },
};

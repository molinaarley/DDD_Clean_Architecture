import { useState, useEffect } from 'react';
import { useAuthStore } from '@/shared/store/auth.store';

export function useAuth() {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
  } = useAuthStore();

  // TODO: Implémenter la vérification automatique du token au démarrage
  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    // checkAuthStatus();
  }, []);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };
}

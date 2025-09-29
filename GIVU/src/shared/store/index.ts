// TODO: Configurer le store Zustand

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// TODO: Créer les stores pour chaque feature
export { useAuthStore } from './auth.store';
// TODO: Ajouter d'autres stores (useProfileStore, useChatStore, etc.)

// Configuration du store principal
export const useAppStore = create(
  devtools(
    (set, get) => ({
      // TODO: Ajouter l'état global de l'application
      isAppReady: false,
      theme: 'light' as 'light' | 'dark',
      language: 'fr',
      
      // Actions
      setAppReady: (ready: boolean) => set({ isAppReady: ready }),
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
      setLanguage: (language: string) => set({ language }),
    }),
    {
      name: 'app-store',
    }
  )
);

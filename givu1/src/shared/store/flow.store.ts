import { create } from 'zustand';

type FlowState = {
  // États partagés entre les écrans d'authentification
  phoneE164?: string;
  email?: string;
  fromOnboarding?: boolean;
  
  // Actions
  set<K extends keyof FlowState>(key: K, value: FlowState[K]): void;
  reset(): void;
};

export const useFlowStore = create<FlowState>((set) => ({
  // État initial
  phoneE164: undefined,
  email: undefined,
  fromOnboarding: undefined,
  
  // Actions
  set: (key, value) => set({ [key]: value } as Partial<FlowState>),
  reset: () => set({
    phoneE164: undefined,
    email: undefined,
    fromOnboarding: undefined,
  }),
}));

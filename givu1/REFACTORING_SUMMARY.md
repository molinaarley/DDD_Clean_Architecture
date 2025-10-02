# Refactoring Summary: Local State to Zustand Store

## Objectif
Refactoriser les composants d'authentification pour utiliser un store Zustand minimal au lieu de passer des paramètres de navigation entre les écrans.

## Store créé
**Fichier**: `src/shared/store/flow.store.ts`

### État géré
- `phoneE164?: string` - Numéro de téléphone au format E.164
- `email?: string` - Adresse email
- `fromOnboarding?: boolean` - Flag indiquant si l'utilisateur vient de l'onboarding

### Actions
- `set<K extends keyof FlowState>(key: K, value: FlowState[K]): void` - Mettre à jour une valeur
- `reset(): void` - Réinitialiser le store

## Composants refactorisés

### 1. PhoneNumberScreen
- **Avant**: Passait `phoneE164` via navigation params
- **Après**: Stocke `phoneE164` dans le store avant la navigation
- **Changement**: `set('phoneE164', phoneE164)` avant `navigation.navigate()`

### 2. OtpVerificationScreen
- **Avant**: Recevait `phoneE164` via route params
- **Après**: Peut accéder à `phoneE164` depuis le store (gardé les params pour compatibilité)
- **Changement**: Ajout de `const { phoneE164: storePhoneE164 } = useFlowStore()`

### 3. PasswordSetupScreen
- **Avant**: Recevait `phoneE164` et `email` via route params
- **Après**: Peut accéder aux valeurs depuis le store + stocke `fromOnboarding`
- **Changement**: 
  - `const { phoneE164: storePhoneE164, email: storeEmail, set } = useFlowStore()`
  - `set('fromOnboarding', true)` avant navigation

### 4. EmailLoginScreen
- **Avant**: Passait `email` via navigation params
- **Après**: Stocke `email` dans le store avant la navigation
- **Changement**: `set('email', email)` avant `navigation.navigate()`

### 5. EmailVerificationPendingScreen
- **Avant**: Recevait `email` via route params
- **Après**: Peut accéder à `email` depuis le store (gardé les params pour compatibilité)
- **Changement**: Ajout de `const { email: storeEmail } = useFlowStore()`

### 6. ProfileSetupScreen
- **Avant**: Recevait `fromOnboarding` via route params
- **Après**: Peut accéder à `fromOnboarding` depuis le store
- **Changement**: `const { fromOnboarding: storeFromOnboarding } = useFlowStore()`

## États locaux conservés
Les états suivants restent locaux car ils ne sont pas partagés entre composants :
- États d'interface utilisateur (modales, timers, etc.)
- États de validation temporaires
- États de navigation locale
- États de formulaire en cours de saisie

## Avantages
1. **Réduction du prop drilling** - Plus besoin de passer des paramètres via navigation
2. **État persistant** - Les données restent disponibles même si l'utilisateur navigue en arrière
3. **Code plus propre** - Moins de paramètres de navigation complexes
4. **Flexibilité** - Facile d'ajouter de nouveaux états partagés

## Compatibilité
- Les paramètres de navigation sont conservés pour la compatibilité
- Le store est utilisé en plus des params, pas à la place
- Aucun changement de comportement visible pour l'utilisateur

## Utilisation
```typescript
import { useFlowStore } from '../../../shared/store';

// Dans un composant
const { phoneE164, email, fromOnboarding, set } = useFlowStore();

// Mettre à jour une valeur
set('phoneE164', '+33123456789');

// Réinitialiser le store
set('reset');
```

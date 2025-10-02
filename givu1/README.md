# GIVU - Application Livu-like

Une application de rencontres vidéo en temps réel construite avec React Native, TypeScript et Expo.

## 🚀 Fonctionnalités

- **Authentification** : Connexion et inscription sécurisées
- **Matchmaking** : Découverte et matching d'utilisateurs
- **Appels vidéo** : Appels en temps réel avec WebRTC
- **Chat** : Messagerie instantanée
- **Portefeuille** : Gestion des paiements et transactions
- **Profil** : Gestion du profil utilisateur
- **Notifications** : Notifications push et locales
- **Modération** : Système de signalement et modération

## 🛠️ Technologies

- **React Native** avec Expo
- **TypeScript** pour la sécurité des types
- **Zustand** pour la gestion d'état
- **React Navigation** pour la navigation
- **Socket.IO** pour les communications temps réel
- **WebRTC** pour les appels vidéo
- **AsyncStorage** pour le stockage local

## 📁 Structure du projet

```
src/
├── app/                    # Point d'entrée de l'application
├── navigation/             # Configuration de la navigation
├── features/               # Fonctionnalités métier
│   ├── auth/              # Authentification
│   ├── matchmaking/       # Système de matching
│   ├── calls/             # Appels vidéo
│   ├── chat/              # Messagerie
│   ├── wallet/            # Portefeuille
│   ├── notifications/     # Notifications
│   ├── profile/           # Profil utilisateur
│   └── moderation/        # Modération
├── shared/                # Code partagé
│   ├── components/        # Composants réutilisables
│   ├── services/          # Services (API, Socket, etc.)
│   ├── store/             # Gestion d'état
│   ├── hooks/             # Hooks personnalisés
│   ├── theme/             # Thème et styles
│   ├── i18n/              # Internationalisation
│   ├── utils/             # Utilitaires
│   ├── constants/         # Constantes
│   └── types/             # Types TypeScript
└── tests/                 # Tests unitaires
```

## 🚀 Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd GIVU
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   # Éditer .env avec vos valeurs
   ```

4. **Démarrer l'application**
   ```bash
   npm start
   ```

## 📱 Scripts disponibles

- `npm start` - Démarrer le serveur de développement
- `npm run android` - Lancer sur Android
- `npm run ios` - Lancer sur iOS
- `npm run web` - Lancer sur le web
- `npm test` - Lancer les tests
- `npm run build` - Construire l'application

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
EXPO_PUBLIC_API_URL=https://api.givu.com
EXPO_PUBLIC_SOCKET_URL=wss://socket.givu.com
EXPO_PUBLIC_APP_ENV=development
```

### Configuration TypeScript

Le projet utilise des alias de chemins pour simplifier les imports :
- `@/*` → `src/*`
- `@features/*` → `src/features/*`
- `@shared/*` → `src/shared/*`
- `@navigation/*` → `src/navigation/*`

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch
npm run test:watch

# Lancer les tests avec couverture
npm run test:coverage
```

## 📦 Déploiement

### Android

```bash
# Construire l'APK
eas build --platform android

# Publier sur Google Play
eas submit --platform android
```

### iOS

```bash
# Construire l'IPA
eas build --platform ios

# Publier sur l'App Store
eas submit --platform ios
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

---

**Note** : Ce projet est actuellement en phase de développement. Tous les fichiers contiennent des placeholders et nécessitent une implémentation complète.

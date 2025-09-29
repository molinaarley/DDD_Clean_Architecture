// TODO: Implémenter les appels API d'authentification

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export class AuthAPI {
  // TODO: Implémenter la connexion
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    throw new Error('Not implemented');
  }

  // TODO: Implémenter l'inscription
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    throw new Error('Not implemented');
  }

  // TODO: Implémenter la déconnexion
  static async logout(): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Implémenter la récupération de mot de passe
  static async forgotPassword(email: string): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Implémenter la vérification du token
  static async verifyToken(token: string): Promise<boolean> {
    throw new Error('Not implemented');
  }
}

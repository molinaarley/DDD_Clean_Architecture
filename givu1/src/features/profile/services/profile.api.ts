// TODO: Implémenter les appels API pour le profil

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  age?: number;
  location?: {
    city: string;
    country: string;
  };
  interests: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  username?: string;
  bio?: string;
  age?: number;
  location?: {
    city: string;
    country: string;
  };
  interests?: string[];
}

export interface UploadAvatarRequest {
  imageUri: string;
  imageType: string;
}

export class ProfileAPI {
  // TODO: Récupérer le profil de l'utilisateur
  static async getProfile(): Promise<UserProfile> {
    throw new Error('Not implemented');
  }

  // TODO: Mettre à jour le profil
  static async updateProfile(request: UpdateProfileRequest): Promise<UserProfile> {
    throw new Error('Not implemented');
  }

  // TODO: Télécharger un avatar
  static async uploadAvatar(request: UploadAvatarRequest): Promise<{ avatarUrl: string }> {
    throw new Error('Not implemented');
  }

  // TODO: Supprimer l'avatar
  static async deleteAvatar(): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer les profils d'autres utilisateurs
  static async getUserProfile(userId: string): Promise<UserProfile> {
    throw new Error('Not implemented');
  }

  // TODO: Signaler un utilisateur
  static async reportUser(userId: string, reason: string, description?: string): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Bloquer un utilisateur
  static async blockUser(userId: string): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Débloquer un utilisateur
  static async unblockUser(userId: string): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer la liste des utilisateurs bloqués
  static async getBlockedUsers(): Promise<UserProfile[]> {
    throw new Error('Not implemented');
  }
}

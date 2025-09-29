// TODO: Implémenter les appels API pour le matchmaking

export interface UserProfile {
  id: string;
  username: string;
  age: number;
  avatar: string;
  bio?: string;
  interests: string[];
  location?: {
    city: string;
    country: string;
  };
  isOnline: boolean;
  lastSeen: string;
}

export interface MatchRequest {
  targetUserId: string;
  message?: string;
}

export interface MatchResponse {
  matchId: string;
  isMatch: boolean;
  message?: string;
}

export class MatchmakingAPI {
  // TODO: Récupérer la liste des utilisateurs disponibles
  static async getDiscoverUsers(filters?: any): Promise<UserProfile[]> {
    throw new Error('Not implemented');
  }

  // TODO: Envoyer une demande de match
  static async sendMatchRequest(request: MatchRequest): Promise<MatchResponse> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer les matches existants
  static async getMatches(): Promise<UserProfile[]> {
    throw new Error('Not implemented');
  }

  // TODO: Supprimer un match
  static async unmatch(matchId: string): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer les likes reçus
  static async getLikes(): Promise<UserProfile[]> {
    throw new Error('Not implemented');
  }
}

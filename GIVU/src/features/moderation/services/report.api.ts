// TODO: Implémenter les appels API pour la modération

export interface ReportRequest {
  targetType: 'user' | 'message' | 'call' | 'profile';
  targetId: string;
  reason: string;
  description?: string;
  evidence?: string[]; // URLs d'images/vidéos
}

export interface Report {
  id: string;
  reporterId: string;
  targetType: string;
  targetId: string;
  reason: string;
  description?: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  createdAt: string;
  updatedAt: string;
}

export interface ModerationAction {
  id: string;
  type: 'warning' | 'suspension' | 'ban' | 'content_removal';
  targetId: string;
  reason: string;
  duration?: number; // en heures pour les suspensions
  createdAt: string;
}

export class ReportAPI {
  // TODO: Signaler un contenu ou un utilisateur
  static async submitReport(request: ReportRequest): Promise<Report> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer les rapports de l'utilisateur
  static async getUserReports(): Promise<Report[]> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer les détails d'un rapport
  static async getReport(reportId: string): Promise<Report> {
    throw new Error('Not implemented');
  }

  // TODO: Annuler un rapport
  static async cancelReport(reportId: string): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer les raisons de signalement disponibles
  static async getReportReasons(): Promise<{ id: string; label: string; description: string }[]> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer les actions de modération contre l'utilisateur
  static async getModerationActions(): Promise<ModerationAction[]> {
    throw new Error('Not implemented');
  }

  // TODO: Contester une action de modération
  static async appealModerationAction(actionId: string, reason: string): Promise<void> {
    throw new Error('Not implemented');
  }
}

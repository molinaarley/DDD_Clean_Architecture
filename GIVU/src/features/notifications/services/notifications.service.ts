// TODO: Implémenter le service de notifications

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'message' | 'call' | 'match' | 'payment' | 'system';
  data?: any;
  timestamp: string;
  isRead: boolean;
}

export interface NotificationPermission {
  granted: boolean;
  canAskAgain: boolean;
}

export class NotificationsService {
  // TODO: Demander les permissions de notification
  static async requestPermissions(): Promise<NotificationPermission> {
    throw new Error('Not implemented');
  }

  // TODO: Vérifier les permissions
  static async checkPermissions(): Promise<NotificationPermission> {
    throw new Error('Not implemented');
  }

  // TODO: Envoyer une notification locale
  static async scheduleLocalNotification(notification: Omit<Notification, 'id' | 'timestamp'>): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer les notifications
  static async getNotifications(): Promise<Notification[]> {
    throw new Error('Not implemented');
  }

  // TODO: Marquer une notification comme lue
  static async markAsRead(notificationId: string): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Marquer toutes les notifications comme lues
  static async markAllAsRead(): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Supprimer une notification
  static async deleteNotification(notificationId: string): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: S'abonner aux notifications push
  static async subscribeToPushNotifications(): Promise<string> {
    throw new Error('Not implemented');
  }

  // TODO: Se désabonner des notifications push
  static async unsubscribeFromPushNotifications(): Promise<void> {
    throw new Error('Not implemented');
  }
}

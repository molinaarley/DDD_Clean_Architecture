// TODO: Implémenter les appels API pour le chat

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  chatId: string;
  text: string;
}

export class ChatAPI {
  // TODO: Récupérer la liste des conversations
  static async getChats(): Promise<Chat[]> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer les messages d'une conversation
  static async getMessages(chatId: string, page = 1, limit = 50): Promise<Message[]> {
    throw new Error('Not implemented');
  }

  // TODO: Envoyer un message
  static async sendMessage(request: SendMessageRequest): Promise<Message> {
    throw new Error('Not implemented');
  }

  // TODO: Marquer les messages comme lus
  static async markAsRead(chatId: string, messageIds: string[]): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Créer une nouvelle conversation
  static async createChat(participantIds: string[]): Promise<Chat> {
    throw new Error('Not implemented');
  }

  // TODO: Supprimer une conversation
  static async deleteChat(chatId: string): Promise<void> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer les messages en temps réel via WebSocket
  static subscribeToMessages(chatId: string, callback: (message: Message) => void): () => void {
    // TODO: Implémenter la souscription WebSocket
    return () => {};
  }
}

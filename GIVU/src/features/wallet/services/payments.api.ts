// TODO: Implémenter les appels API pour les paiements

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description: string;
  timestamp: string;
  recipientId?: string;
  recipientName?: string;
}

export interface PaymentRequest {
  amount: number;
  recipientId: string;
  description?: string;
}

export interface DepositRequest {
  amount: number;
  paymentMethod: 'card' | 'bank_transfer' | 'crypto';
  paymentMethodId: string;
}

export interface WithdrawalRequest {
  amount: number;
  bankAccountId: string;
}

export class PaymentsAPI {
  // TODO: Récupérer le solde du portefeuille
  static async getBalance(): Promise<{ balance: number; currency: string }> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer l'historique des transactions
  static async getTransactions(page = 1, limit = 20): Promise<Transaction[]> {
    throw new Error('Not implemented');
  }

  // TODO: Effectuer un paiement
  static async makePayment(request: PaymentRequest): Promise<Transaction> {
    throw new Error('Not implemented');
  }

  // TODO: Ajouter des fonds
  static async deposit(request: DepositRequest): Promise<Transaction> {
    throw new Error('Not implemented');
  }

  // TODO: Retirer des fonds
  static async withdraw(request: WithdrawalRequest): Promise<Transaction> {
    throw new Error('Not implemented');
  }

  // TODO: Récupérer les méthodes de paiement
  static async getPaymentMethods(): Promise<any[]> {
    throw new Error('Not implemented');
  }

  // TODO: Ajouter une méthode de paiement
  static async addPaymentMethod(methodData: any): Promise<any> {
    throw new Error('Not implemented');
  }

  // TODO: Supprimer une méthode de paiement
  static async removePaymentMethod(methodId: string): Promise<void> {
    throw new Error('Not implemented');
  }
}

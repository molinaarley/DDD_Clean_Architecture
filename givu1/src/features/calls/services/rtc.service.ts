// TODO: Implémenter le service WebRTC pour les appels vidéo

export interface CallConfig {
  callId: string;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
}

export interface RTCService {
  // Initialiser la connexion WebRTC
  initialize(): Promise<void>;
  
  // Créer un appel
  createCall(callId: string): Promise<CallConfig>;
  
  // Rejoindre un appel
  joinCall(callId: string): Promise<CallConfig>;
  
  // Terminer un appel
  endCall(callId: string): Promise<void>;
  
  // Basculer la vidéo
  toggleVideo(): Promise<void>;
  
  // Basculer l'audio
  toggleAudio(): Promise<void>;
  
  // Changer de caméra
  switchCamera(): Promise<void>;
}

// TODO: Implémenter le service WebRTC réel
export class WebRTCService implements RTCService {
  async initialize(): Promise<void> {
    throw new Error('Not implemented');
  }

  async createCall(callId: string): Promise<CallConfig> {
    throw new Error('Not implemented');
  }

  async joinCall(callId: string): Promise<CallConfig> {
    throw new Error('Not implemented');
  }

  async endCall(callId: string): Promise<void> {
    throw new Error('Not implemented');
  }

  async toggleVideo(): Promise<void> {
    throw new Error('Not implemented');
  }

  async toggleAudio(): Promise<void> {
    throw new Error('Not implemented');
  }

  async switchCamera(): Promise<void> {
    throw new Error('Not implemented');
  }
}

// Mock service pour le développement
export class MockRTCService implements RTCService {
  async initialize(): Promise<void> {
    console.log('Mock RTC Service initialized');
  }

  async createCall(callId: string): Promise<CallConfig> {
    console.log(`Mock: Creating call ${callId}`);
    return {
      callId,
      isVideoEnabled: true,
      isAudioEnabled: true,
    };
  }

  async joinCall(callId: string): Promise<CallConfig> {
    console.log(`Mock: Joining call ${callId}`);
    return {
      callId,
      isVideoEnabled: true,
      isAudioEnabled: true,
    };
  }

  async endCall(callId: string): Promise<void> {
    console.log(`Mock: Ending call ${callId}`);
  }

  async toggleVideo(): Promise<void> {
    console.log('Mock: Toggling video');
  }

  async toggleAudio(): Promise<void> {
    console.log('Mock: Toggling audio');
  }

  async switchCamera(): Promise<void> {
    console.log('Mock: Switching camera');
  }
}

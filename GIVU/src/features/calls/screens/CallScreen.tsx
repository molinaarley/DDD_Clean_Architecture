import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LocalPreview } from '../components/LocalPreview';

interface CallScreenProps {
  callId: string;
  isIncoming?: boolean;
}

export function CallScreen({ callId, isIncoming = false }: CallScreenProps) {
  // TODO: Implémenter la logique d'appel vidéo
  const handleAnswer = () => {
    console.log('Answer call - TODO');
  };

  const handleReject = () => {
    console.log('Reject call - TODO');
  };

  const handleEndCall = () => {
    console.log('End call - TODO');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isIncoming ? 'Appel entrant' : 'Appel en cours'}
      </Text>
      
      <View style={styles.videoContainer}>
        <LocalPreview />
        {/* TODO: Ajouter la vue de l'utilisateur distant */}
      </View>
      
      <View style={styles.controls}>
        {isIncoming ? (
          <>
            <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
              <Text style={styles.buttonText}>Refuser</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerButton} onPress={handleAnswer}>
              <Text style={styles.buttonText}>Accepter</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.endButton} onPress={handleEndCall}>
            <Text style={styles.buttonText}>Raccrocher</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  answerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#F44336',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endButton: {
    backgroundColor: '#F44336',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFlowStore } from '../store';

export function FlowStoreDebug() {
  const { phoneE164, email, fromOnboarding } = useFlowStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flow Store Debug</Text>
      <Text style={styles.text}>Phone: {phoneE164 || 'Not set'}</Text>
      <Text style={styles.text}>Email: {email || 'Not set'}</Text>
      <Text style={styles.text}>From Onboarding: {fromOnboarding ? 'Yes' : 'No'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});

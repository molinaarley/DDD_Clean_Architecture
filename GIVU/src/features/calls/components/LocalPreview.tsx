import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export function LocalPreview() {
  // TODO: Implémenter la prévisualisation de la caméra locale
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>
        Prévisualisation locale - TODO
      </Text>
      {/* TODO: Intégrer la caméra avec react-native-webrtc ou expo-camera */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 160,
    backgroundColor: '#333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  placeholder: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

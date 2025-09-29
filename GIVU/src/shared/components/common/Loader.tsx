import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
}

export function Loader({ size = 'large', color = '#007AFF', text }: LoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

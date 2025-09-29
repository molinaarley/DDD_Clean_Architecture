import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function HomePlaceholderScreen() {
  return (
    <LinearGradient
      colors={['#1E3A8A', '#3B82F6', '#06B6D4']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>HOME PLACEHOLDER</Text>
        <Text style={styles.subtitle}>Bienvenue dans GIVU !</Text>
        <Text style={styles.description}>
          Votre compte a été créé avec succès. 
          L'application principale sera bientôt disponible.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
});

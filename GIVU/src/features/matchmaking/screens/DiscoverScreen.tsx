import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export function DiscoverScreen() {
  // TODO: Implémenter l'écran de découverte/matchmaking
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Découvrir</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.placeholder}>
          Écran de découverte - TODO
        </Text>
        {/* TODO: Ajouter la liste des utilisateurs disponibles */}
        {/* TODO: Ajouter les filtres de recherche */}
        {/* TODO: Ajouter la logique de swipe/match */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

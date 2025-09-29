import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// TODO: Importer les vrais écrans une fois créés
const DiscoverScreen = () => <Text>Discover Screen - TODO</Text>;
const ChatListScreen = () => <Text>Chat List Screen - TODO</Text>;
const WalletScreen = () => <Text>Wallet Screen - TODO</Text>;
const ProfileScreen = () => <Text>Profile Screen - TODO</Text>;

const Tab = createBottomTabNavigator();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // TODO: Personnaliser le style des onglets
        },
      }}
    >
      <Tab.Screen 
        name="Discover" 
        component={DiscoverScreen}
        options={{
          tabBarLabel: 'Découvrir',
          // TODO: Ajouter les icônes
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatListScreen}
        options={{
          tabBarLabel: 'Messages',
        }}
      />
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen}
        options={{
          tabBarLabel: 'Portefeuille',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
}

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootAuthStackParamList } from '../../../navigation/types';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isLargeScreen = width > 414;

type ChatListScreenNavigationProp = StackNavigationProp<RootAuthStackParamList, 'ChatList'>;

interface ChatUser {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  isOnline?: boolean;
  unreadCount?: number;
  avatar?: string;
  country?: string;
  isVerified?: boolean;
}

const mockChats: ChatUser[] = [
  {
    id: '1',
    name: 'la_cubanita',
    lastMessage: 'rechargez à nouveau vos pièces',
    timestamp: '00:30',
    isVerified: true,
    unreadCount: 0,
  },
  {
    id: '2',
    name: 'caniye',
    lastMessage: 'tomorrow?',
    timestamp: '00:28',
    isVerified: true,
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'katerine',
    lastMessage: 'Tu me reconnais ?',
    timestamp: '00:25',
    isOnline: true,
    unreadCount: 2,
    country: '🇧🇷',
  },
];

export function ChatListScreen() {
  const navigation = useNavigation<ChatListScreenNavigationProp>();
  const [dismissBanner, setDismissBanner] = useState(false);

  const handleChatPress = (user: ChatUser) => {
    (navigation as any).navigate('ChatDetail', { user });
  };

  const handleDismissBanner = () => {
    setDismissBanner(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Message</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Text style={styles.headerIconText}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Promotional Banner */}
        {!dismissBanner && (
          <View style={styles.promotionalBanner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerText}>+99 personnes font des rencontres</Text>
              <View style={styles.bannerProfiles}>
                <View style={styles.profileDot} />
                <View style={styles.profileDot} />
                <View style={styles.profileDot} />
                <Text style={styles.profileCount}>99+</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleDismissBanner} style={styles.dismissButton}>
              <Text style={styles.dismissText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Feature Rows */}
        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureIconText}>🎧</Text>
          </View>
          <Text style={styles.featureText}>Service client</Text>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureIconText}>❤️</Text>
          </View>
          <Text style={styles.featureText}>57 personnes vous apprécient et souhaitent faire connaissance !</Text>
        </View>

        {/* Friend Requests */}
        <TouchableOpacity style={styles.friendRequestsRow}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureIconText}>💬</Text>
          </View>
          <Text style={styles.featureText}>Nouvelles demandes d'amis</Text>
          <View style={styles.friendRequestsCount}>
            <Text style={styles.friendRequestsCountText}>7</Text>
          </View>
        </TouchableOpacity>

        {/* Chat List */}
        {mockChats.map((user) => (
          <TouchableOpacity
            key={user.id.toString()}
            style={styles.chatItem}
            onPress={() => handleChatPress(user)}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user.name.charAt(0).toUpperCase().toString()}
                </Text>
              </View>
              {user.isOnline && <View style={styles.onlineIndicator} />}
            </View>
            
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.userName}>
                  {user.name}
                  {user.isVerified ? <Text style={styles.verifiedIcon}> ✓</Text> : null}
                  {user.country ? <Text style={styles.countryText}> {user.country}</Text> : null}
                </Text>
                <Text style={styles.timestamp}>{user.timestamp}</Text>
              </View>
              
              <View style={styles.messageContainer}>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {user.lastMessage}
                </Text>
                {user.unreadCount && user.unreadCount > 0 ? (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{user.unreadCount.toString()}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>












      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🌐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.messageNavItem}>
            <Text style={styles.navIcon}>💬</Text>
            <View style={styles.navBadge}>
              <Text style={styles.navBadgeText}>27</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 0, // Asegurar que no hay padding extra en el contenedor
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: isSmallScreen ? 20 : isLargeScreen ? 28 : 24,
    fontWeight: 'bold',
    color: 'black',
  },
  headerIcon: {
    padding: 5,
  },
  headerIconText: {
    fontSize: isSmallScreen ? 18 : 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20, // Espacio adicional en el contenido
  },
  promotionalBanner: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  bannerProfiles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginRight: 4,
  },
  profileCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dismissButton: {
    padding: 5,
  },
  dismissText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  friendRequestsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  friendRequestsCount: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendRequestsCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  verifiedIcon: {
    color: '#4CAF50',
    fontSize: 14,
  },
  countryText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 15,
    paddingBottom: 40, // Mucho más espacio para separar de los iconos del sistema
    paddingHorizontal: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  navIcon: {
    fontSize: 24,
  },
  messageNavItem: {
    position: 'relative',
  },
  navBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
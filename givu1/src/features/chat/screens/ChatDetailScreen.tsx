import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootAuthStackParamList } from '../../../navigation/types';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isLargeScreen = width > 414;

type ChatDetailScreenNavigationProp = StackNavigationProp<RootAuthStackParamList, 'ChatDetail'>;
type ChatDetailScreenRouteProp = RouteProp<RootAuthStackParamList, 'ChatDetail'>;

interface Message {
  id: string;
  text: string;
  isFromUser: boolean;
  timestamp: string;
  isSystemMessage?: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: '🎉🦋Ivy🦋 vous a envoyé une demande d\'amitié.',
    isFromUser: false,
    timestamp: '00:40',
    isSystemMessage: true,
  },
  {
    id: '2',
    text: '🎉🦋Ivy🦋 vous a ajouté comme ami.',
    isFromUser: false,
    timestamp: '00:41',
    isSystemMessage: true,
  },
  {
    id: '3',
    text: 'hi babe',
    isFromUser: false,
    timestamp: '00:42',
  },
  {
    id: '4',
    text: 'Salut bébé.',
    isFromUser: false,
    timestamp: '00:43',
  },
];

export function ChatDetailScreen() {
  const navigation = useNavigation<ChatDetailScreenNavigationProp>();
  const route = useRoute<ChatDetailScreenRouteProp>();
  const { user } = route.params;
  
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        isFromUser: true,
        timestamp: new Date().toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderMessage = (message: Message) => {
    if (message.isSystemMessage) {
      return (
        <View key={message.id} style={styles.systemMessageContainer}>
          <Text style={styles.systemMessage}>{message.text}</Text>
        </View>
      );
    }

    return (
      <View key={message.id} style={[
        styles.messageContainer,
        message.isFromUser ? styles.userMessageContainer : styles.otherMessageContainer
      ]}>
        {!message.isFromUser && (
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        )}
        
        <View style={[
          styles.messageBubble,
          message.isFromUser ? styles.userMessage : styles.otherMessage
        ]}>
          <Text style={[
            styles.messageText,
            message.isFromUser ? styles.userMessageText : styles.otherMessageText
          ]}>
            {message.text}
          </Text>
          <Text style={[
            styles.messageTime,
            message.isFromUser ? styles.userMessageTime : styles.otherMessageTime
          ]}>
            {message.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            🦋<Text style={styles.userNameText}>{user.name}</Text>🦋
          </Text>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Messages */}
        <ScrollView 
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          {/* Input field con botón de envío integrado */}
          <View style={styles.inputFieldContainer}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.messageInput}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Message"
                placeholderTextColor="#999"
                multiline
                maxLength={500}
              />
              
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Text style={styles.sendIcon}>▶</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Iconos abajo - separados para ocupar todo el espacio */}
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🎁</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📷</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>😊</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📹</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 15,
  },
  backIcon: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  moreButton: {
    padding: 5,
  },
  moreIcon: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#E5DDD5', // Fondo beige claro como WhatsApp
  },
  messagesContent: {
    paddingVertical: 10,
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  systemMessage: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  messageBubble: {
    maxWidth: width * 0.7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: '#8B5CF6', // Tu color original
    alignSelf: 'flex-end',
    marginLeft: 50,
  },
  otherMessage: {
    backgroundColor: '#f0f0f0', // Tu color original
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: 'white', // Tu color original
  },
  otherMessageText: {
    color: 'black', // Tu color original
  },
  messageTime: {
    fontSize: 12,
    marginTop: 5,
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.7)', // Tu color original
    textAlign: 'right',
  },
  otherMessageTime: {
    color: '#666', // Tu color original
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingBottom: 60, // Subido aún más para mejor posición inicial
  },
  inputFieldContainer: {
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: isSmallScreen ? 12 : 15,
    paddingVertical: isSmallScreen ? 12 : 15,
    fontSize: isSmallScreen ? 14 : 16,
    minHeight: isSmallScreen ? 50 : 60,
    maxHeight: isLargeScreen ? 140 : 120,
    marginRight: 10,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  actionButton: {
    flex: 1,
    padding: isSmallScreen ? 12 : 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: isSmallScreen ? 18 : 20,
  },
  emojiButton: {
    padding: 10,
    marginRight: 5,
  },
  emojiIcon: {
    fontSize: 20,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: isSmallScreen ? 36 : 40,
    height: isSmallScreen ? 36 : 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendIcon: {
    fontSize: isSmallScreen ? 14 : 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootAuthStackParamList } from '../../../types/navigation';

const { width } = Dimensions.get('window');

type EmailLoginScreenNavigationProp = StackNavigationProp<RootAuthStackParamList, 'EmailInput'>;

export function EmailLoginScreen() {
  const navigation = useNavigation<EmailLoginScreenNavigationProp>();
  const [email, setEmail] = useState('immobilierespagne2016@gmail.com');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    // TODO: Implémenter la logique de connexion par email
    console.log('Email login:', email);
    navigation.navigate('EmailVerificationPending', { email });
  };

  const handleGoogleLogin = () => {
    // TODO: Implémenter la logique de connexion Google
    console.log('Google login');
  };

  const clearEmail = () => {
    setEmail('');
  };

  return (
    <LinearGradient
      colors={['#1E3A8A', '#3B82F6', '#06B6D4']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Connexion avec adresse e-mail</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Veuillez vous assurer que vous avez saisi la bonne adresse e-mail. 
          L'adresse e-mail sera utilisée pour vérifier votre compte et récupérer votre mot de passe.
        </Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.emailInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Entrez votre adresse e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {email.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearEmail}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Connexion</Text>
        </TouchableOpacity>

        {/* OR Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>OU</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Google Login Button */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <View style={styles.googleIconContainer}>
            <Text style={styles.googleIcon}>G</Text>
          </View>
          <Text style={styles.googleButtonText}>Connexion avec Google</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  instructionText: {
    fontSize: 14,
    color: 'white',
    lineHeight: 20,
    marginBottom: 30,
    opacity: 0.9,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  emailInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 0,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
  },
  clearButton: {
    position: 'absolute',
    right: 0,
    top: 15,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    fontSize: 16,
    color: '#999',
  },
  loginButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 15,
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
  },
  googleButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  googleIcon: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 12,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
});

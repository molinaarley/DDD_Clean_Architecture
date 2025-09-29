import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../../navigation/types';

type PasswordSetupScreenProps = AuthStackScreenProps<'PasswordSetup'>;

export function PasswordSetupScreen() {
  const navigation = useNavigation();
  const route = useRoute<PasswordSetupScreenProps['route']>();
  const { phoneE164, email } = route.params || {};
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConfirm = () => {
    if (password.length < 8) {
      Alert.alert(
        'Erreur de mot de passe',
        'Le mot de passe doit contenir au moins 8 caractères.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    // TODO: Implement password setup API call
    if (phoneE164) {
      console.log('Password setup for phone:', phoneE164, 'password:', password);
    } else if (email) {
      console.log('Password setup for email:', email, 'password:', password);
    }
    navigation.navigate('ProfileSetup' as never, { fromOnboarding: true });
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login');
  };

  return (
    <LinearGradient
      colors={['#1E3A8A', '#3B82F6', '#06B6D4']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Configuration du mot de passe</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Créez un mot de passe sécurisé pour votre compte GIVU.
        </Text>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mot de passe</Text>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="8 caractères minimum"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirmer le mot de passe</Text>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmer le mot de passe"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirmer</Text>
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
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    fontWeight: '600',
  },
  passwordInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 0,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
  },
  confirmButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  confirmButtonText: {
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

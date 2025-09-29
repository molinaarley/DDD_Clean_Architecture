import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootAuthStackParamList } from '../../../types/navigation';

type EmailVerificationPendingScreenRouteProp = RouteProp<RootAuthStackParamList, 'EmailVerificationPending'>;
type EmailVerificationPendingScreenNavigationProp = StackNavigationProp<RootAuthStackParamList, 'EmailVerificationPending'>;

export function EmailVerificationPendingScreen() {
  const navigation = useNavigation<EmailVerificationPendingScreenNavigationProp>();
  const route = useRoute<EmailVerificationPendingScreenRouteProp>();
  const { email } = route.params;
  
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => Math.max(0, s - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    navigation.navigate('PasswordSetup', { email });
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login');
  };

  const handleResendCode = () => {
    if (seconds === 0) {
      // TODO: Implement resend code API call
      console.log('Resending code to:', email);
      setSeconds(60);
    }
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
        <Text style={styles.title}>Vérification e-mail</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Nous avons envoyé un code de vérification à :
        </Text>
        
        <Text style={styles.emailText}>{email}</Text>
        
        <Text style={styles.instructionText}>
          Veuillez vérifier votre boîte e-mail et saisir le code reçu.
        </Text>

        {/* Resend Code Button */}
        <TouchableOpacity 
          style={[styles.resendButton, seconds > 0 && styles.resendButtonDisabled]} 
          onPress={handleResendCode}
          disabled={seconds > 0}
        >
          <Text style={[styles.resendButtonText, seconds > 0 && styles.resendButtonTextDisabled]}>
            {seconds > 0 ? `Obtenir un nouveau code (${seconds}s)` : 'Obtenir un nouveau code'}
          </Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Suivant</Text>
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
    marginBottom: 20,
    opacity: 0.9,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  resendButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  resendButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  resendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  nextButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  nextButtonText: {
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

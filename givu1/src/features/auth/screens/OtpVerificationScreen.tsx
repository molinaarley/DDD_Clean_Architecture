import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../../navigation/types';
import { useFlowStore } from '../../../shared/store';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isLargeScreen = width > 414;

type OtpVerificationScreenProps = AuthStackScreenProps<'OtpVerification'>;

export function OtpVerificationScreen() {
  const navigation = useNavigation();
  const route = useRoute<OtpVerificationScreenProps['route']>();
  const { phoneE164 } = route.params;
  const { phoneE164: storePhoneE164 } = useFlowStore();
  
  const [otpCode, setOtpCode] = useState('');
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => Math.max(0, s - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleVerify = () => {
    if (otpCode.length !== 6) {
      Alert.alert('Erreur', 'Veuillez entrer le code de vérification complet');
      return;
    }

    // TODO: Implement OTP verification API call
    console.log('Verifying OTP:', otpCode, 'for phone:', phoneE164);
    
    // TODO: Handle verification success/failure
    navigation.navigate('PasswordSetup' as never, { phoneE164 });
  };

  const handleResendCode = () => {
    if (seconds > 0) return;
    
    // TODO: Implement resend OTP API call
    console.log('Resending OTP to:', phoneE164);
    setSeconds(60);
    Alert.alert('Code renvoyé', 'Un nouveau code a été envoyé à votre numéro');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const formatPhoneNumber = (phone: string) => {
    // Simple formatting for display
    if (phone.startsWith('+33')) {
      return phone.replace('+33', '+33 ').replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    return phone;
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
        <Text style={styles.title}>Vérification du code</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Le code de vérification a été envoyé à votre numéro de téléphone
        </Text>
        
        <Text style={styles.phoneNumber}>{formatPhoneNumber(phoneE164)}</Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          <TextInput
            style={styles.otpInput}
            value={otpCode}
            onChangeText={setOtpCode}
            placeholder="000000"
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
            textAlign="center"
          />
        </View>

        {/* Resend Code */}
        <TouchableOpacity 
          style={[styles.resendButton, seconds > 0 && styles.resendButtonDisabled]} 
          onPress={handleResendCode}
          disabled={seconds > 0}
        >
          <Text style={[styles.resendButtonText, seconds > 0 && styles.resendButtonTextDisabled]}>
            {seconds > 0 ? `Obtenir un nouveau code (${seconds}s)` : 'Obtenir un nouveau code'}
          </Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <TouchableOpacity 
          style={[styles.verifyButton, otpCode.length !== 6 && styles.verifyButtonDisabled]} 
          onPress={handleVerify}
          disabled={otpCode.length !== 6}
        >
          <Text style={styles.verifyButtonText}>Vérifier</Text>
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
    marginBottom: 10,
    opacity: 0.9,
    textAlign: 'center',
  },
  phoneNumber: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  otpInput: {
    fontSize: 24,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 200,
    textAlign: 'center',
    letterSpacing: 8,
    fontWeight: 'bold',
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
  verifyButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  verifyButtonDisabled: {
    backgroundColor: 'rgba(139, 92, 246, 0.5)',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

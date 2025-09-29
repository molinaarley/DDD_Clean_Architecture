import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export function LoginScreen() {
  const navigation = useNavigation();

  const handleGoogleLogin = () => {
    navigation.navigate('Register' as never);
  };

  const handlePhoneLogin = () => {
    navigation.navigate('PhoneNumber' as never, { preset: 'phone' });
  };

  const handleEmailLogin = () => {
    navigation.navigate('EmailInput' as never);
  };

  return (
    <LinearGradient
      colors={['#1E3A8A', '#3B82F6', '#06B6D4']}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Logo and Matches */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>GIVU</Text>
          <Text style={styles.matchesNumber}>24 789 123 456</Text>
          <Text style={styles.matchesText}>Matches</Text>
        </View>

        {/* Network Dots */}
        <View style={styles.networkContainer}>
          {[...Array(20)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.networkDot,
                {
                  left: Math.random() * (width - 40),
                  top: Math.random() * 200 + 100,
                }
              ]}
            >
              <View style={styles.profilePic}>
                <Text style={styles.profileEmoji}>
                  {['👤', '👩', '👨', '🧑', '👧', '👦'][Math.floor(Math.random() * 6)]}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Legal Text */}
      <Text style={styles.legalText}>
        En utilisant GIVU, vous acceptez les{' '}
        <Text style={styles.legalLink}>Conditions d'utilisation</Text>
        {' '}et la{' '}
        <Text style={styles.legalLink}>Politique de confidentialité</Text>.
      </Text>

      {/* Login Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <View style={styles.googleIconContainer}>
            <Text style={styles.googleIcon}>G</Text>
          </View>
          <Text style={styles.googleButtonText}>Connexion avec Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handlePhoneLogin}>
          <Text style={styles.buttonIcon}>📱</Text>
          <Text style={styles.buttonText}>Connexion avec numéro de téléphone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleEmailLogin}>
          <Text style={styles.buttonIcon}>✉️</Text>
          <Text style={styles.buttonText}>Se connecter avec une adresse e-mail</Text>
        </TouchableOpacity>
      </View>

      {/* Help Text */}
      <Text style={styles.helpText}>
        VOUS RENCONTREZ UN PROBLÈME DE CONNEXION ?
      </Text>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 10,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  matchesNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  matchesText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  networkContainer: {
    position: 'absolute',
    width: '100%',
    height: 300,
    top: 0,
    left: 0,
  },
  networkDot: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileEmoji: {
    fontSize: 12,
  },
  legalText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 20,
    marginBottom: 30,
    lineHeight: 18,
  },
  legalLink: {
    textDecorationLine: 'underline',
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  loginButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  buttonText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  helpText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    fontWeight: '500',
  },
});

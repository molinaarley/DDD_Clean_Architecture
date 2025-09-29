import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../../navigation/types';
import { useLocation } from '../../../shared/hooks/useLocation';
import { countries, Country } from '../../../shared/data/countries';

type PhoneNumberScreenProps = AuthStackScreenProps<'PhoneNumber'>;

export function PhoneNumberScreen() {
  const navigation = useNavigation();
  const route = useRoute<PhoneNumberScreenProps['route']>();
  const { country, loading: locationLoading } = useLocation();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // Default to France
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Establecer el país detectado por GPS cuando esté disponible
  useEffect(() => {
    if (country && !locationLoading) {
      setSelectedCountry(country);
    }
  }, [country, locationLoading]);

  const handleNext = () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone');
      return;
    }

    // TODO: Normalizar el número a E.164
    const phoneE164 = `${selectedCountry.phoneCode}${phoneNumber.replace(/\s/g, '')}`;
    
    // TODO: Validar formato del número
    if (phoneNumber.length < 8) {
      Alert.alert('Erreur', 'Le numéro de téléphone doit contenir au moins 8 chiffres');
      return;
    }

    console.log('Phone number:', phoneE164);
    navigation.navigate('OtpVerification' as never, { phoneE164 });
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
    setSearchQuery('');
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.phoneCode.includes(searchQuery)
  );

  const handleBack = () => {
    navigation.goBack();
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
        <Text style={styles.title}>Connexion avec numéro de téléphone</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Entrez votre numéro de téléphone pour recevoir un code de vérification
        </Text>

        {/* Phone Input */}
        <View style={styles.phoneInputContainer}>
          <TouchableOpacity 
            style={styles.countryCodeContainer}
            onPress={() => setShowCountryPicker(true)}
          >
            <Text style={styles.flag}>{selectedCountry.flag}</Text>
            <Text style={styles.countryCode}>{selectedCountry.phoneCode}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          
          <View style={styles.separator} />
          
          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Entrez votre numéro"
            keyboardType="phone-pad"
            autoFocus
          />
        </View>

        {/* Location Loading Indicator */}
        {locationLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="white" />
            <Text style={styles.loadingText}>Détection de votre pays...</Text>
          </View>
        )}

        {/* Next Button */}
        <TouchableOpacity 
          style={[styles.nextButton, !phoneNumber.trim() && styles.nextButtonDisabled]} 
          onPress={handleNext}
          disabled={!phoneNumber.trim()}
        >
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <Text style={styles.modalCancelButton}>ANNULER</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Sélectionner un pays</Text>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <Text style={styles.modalOkButton}>OK</Text>
              </TouchableOpacity>
            </View>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Rechercher un pays..."
                placeholderTextColor="#999"
                autoFocus
              />
            </View>
            
            {/* Countries List */}
            <ScrollView style={styles.countriesList} showsVerticalScrollIndicator={false}>
              {filteredCountries.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  style={[
                    styles.countryItem,
                    selectedCountry.code === country.code && styles.countryItemSelected
                  ]}
                  onPress={() => handleCountrySelect(country)}
                >
                  <Text style={styles.countryFlag}>{country.flag}</Text>
                  <Text style={[
                    styles.countryName,
                    selectedCountry.code === country.code && styles.countryNameSelected
                  ]}>
                    {country.name}
                  </Text>
                  <Text style={[
                    styles.countryPhoneCode,
                    selectedCountry.code === country.code && styles.countryPhoneCodeSelected
                  ]}>
                    {country.phoneCode}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 30,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginRight: 5,
  },
  dropdownArrow: {
    fontSize: 12,
    color: 'white',
    opacity: 0.7,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 15,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
  },
  nextButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(139, 92, 246, 0.5)',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Loading styles
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
    opacity: 0.8,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalCancelButton: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOkButton: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Search styles
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  // Countries list styles
  countriesList: {
    maxHeight: 400,
    paddingHorizontal: 10,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  countryItemSelected: {
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 15,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  countryNameSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  countryPhoneCode: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  countryPhoneCodeSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
});

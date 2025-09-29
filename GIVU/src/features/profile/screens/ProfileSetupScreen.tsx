import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthStackScreenProps } from '../../../navigation/types';

type ProfileSetupScreenProps = AuthStackScreenProps<'ProfileSetup'>;

export function ProfileSetupScreen() {
  const navigation = useNavigation();
  const route = useRoute<ProfileSetupScreenProps['route']>();
  const { fromOnboarding } = route.params;
  
  const [pseudonyme, setPseudonyme] = useState('');
  const [anniversaire, setAnniversaire] = useState('');
  const [selectedGender, setSelectedGender] = useState<'Femme' | 'Homme' | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});

  const handleFinish = () => {
    if (!pseudonyme.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un pseudonyme');
      return;
    }
    if (!anniversaire) {
      Alert.alert('Erreur', 'Veuillez sélectionner votre date de naissance');
      return;
    }
    if (!selectedGender) {
      Alert.alert('Erreur', 'Veuillez sélectionner votre sexe');
      return;
    }
    
    // TODO: Implement profile setup API call
    console.log('Profile setup:', { pseudonyme, anniversaire, selectedGender, fromOnboarding });
    
    if (fromOnboarding) {
      // TODO: Navigate to main app or home screen
      Alert.alert('Succès', 'Profil créé avec succès!');
      navigation.replace('Login' as never);
    } else {
      navigation.goBack();
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDateSelect = (day: any) => {
    const selectedDate = new Date(day.dateString);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
      // Si aún no ha cumplido años este año
      if (age - 1 < 18) {
        Alert.alert('Erreur', 'Vous devez avoir au moins 18 ans pour utiliser GIVU');
        return;
      }
    } else {
      if (age < 18) {
        Alert.alert('Erreur', 'Vous devez avoir au moins 18 ans pour utiliser GIVU');
        return;
      }
    }
    
    setSelectedDate(selectedDate);
    setAnniversaire(selectedDate.toLocaleDateString('fr-FR'));
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        selectedColor: '#8B5CF6',
        selectedTextColor: 'white'
      }
    });
    setShowDatePicker(false);
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
        <Text style={styles.title}>Configuration du profil</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Complétez votre profil pour commencer à utiliser GIVU.
        </Text>

        {/* Pseudonyme Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Pseudonyme</Text>
          <TextInput
            style={styles.textInput}
            value={pseudonyme}
            onChangeText={setPseudonyme}
            placeholder="Entrez votre pseudonyme"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Anniversaire Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Anniversaire</Text>
          <TouchableOpacity 
            style={styles.dateInputButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[styles.dateInputText, !anniversaire && styles.dateInputPlaceholder]}>
              {anniversaire || 'JJ/MM/AAAA'}
            </Text>
            <Text style={styles.dateInputIcon}>📅</Text>
          </TouchableOpacity>
        </View>

        {/* Gender Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Sexe</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === 'Femme' && styles.genderButtonSelected
              ]}
              onPress={() => setSelectedGender('Femme')}
            >
              <View style={styles.genderIconContainer}>
                <Text style={styles.genderIcon}>👩</Text>
              </View>
              <Text style={[
                styles.genderButtonText,
                selectedGender === 'Femme' && styles.genderButtonTextSelected
              ]}>
                Femme
              </Text>
              <View style={[
                styles.genderRadio,
                selectedGender === 'Femme' && styles.genderRadioSelected
              ]} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === 'Homme' && styles.genderButtonSelected
              ]}
              onPress={() => setSelectedGender('Homme')}
            >
              <View style={styles.genderIconContainer}>
                <Text style={styles.genderIcon}>👨</Text>
              </View>
              <Text style={[
                styles.genderButtonText,
                selectedGender === 'Homme' && styles.genderButtonTextSelected
              ]}>
                Homme
              </Text>
              <View style={[
                styles.genderRadio,
                selectedGender === 'Homme' && styles.genderRadioSelected
              ]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal Text */}
        <Text style={styles.legalText}>
          En continuant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité. 
          Vos informations personnelles seront utilisées conformément à notre politique de confidentialité.
        </Text>

        {/* Finish Button */}
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Terminer</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.modalCancelButton}>ANNULER</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Sélectionner votre date de naissance</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.modalOkButton}>OK</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={handleDateSelect}
                markedDates={markedDates}
                maxDate={new Date().toISOString().split('T')[0]}
                minDate={'1900-01-01'}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: '#8B5CF6',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#8B5CF6',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#8B5CF6',
                  selectedDotColor: '#ffffff',
                  arrowColor: '#8B5CF6',
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: '#2d4150',
                  indicatorColor: '#8B5CF6',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 13
                }}
                style={styles.calendar}
              />
            </View>
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
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    fontWeight: '600',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 0,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
  },
  dateInputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 0,
  },
  dateInputText: {
    fontSize: 16,
    color: 'white',
  },
  dateInputPlaceholder: {
    color: '#999',
  },
  dateInputIcon: {
    fontSize: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  genderButtonSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  genderIconContainer: {
    marginBottom: 10,
  },
  genderIcon: {
    fontSize: 40,
  },
  genderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  genderButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  genderRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  genderRadioSelected: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  legalText: {
    fontSize: 12,
    color: 'white',
    lineHeight: 18,
    marginBottom: 30,
    opacity: 0.8,
    textAlign: 'center',
  },
  finishButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    paddingBottom: 20,
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
  calendarContainer: {
    padding: 20,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    margin: 0,
  },
});

import React, { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  cells?: number;
  autoFocus?: boolean;
}

export function OtpInput({ 
  value, 
  onChange, 
  cells = 6, 
  autoFocus = false 
}: OtpInputProps) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChangeText = (text: string) => {
    // Only allow digits and limit to number of cells
    const digitsOnly = text.replace(/\D/g, '').slice(0, cells);
    onChange(digitsOnly);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        maxLength={cells}
        textAlign="center"
        autoFocus={autoFocus}
        selectTextOnFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
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
});

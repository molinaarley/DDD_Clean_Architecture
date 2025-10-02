import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

export function Text({
  children,
  variant = 'body',
  color,
  style,
  numberOfLines,
}: TextProps) {
  return (
    <RNText
      style={[
        styles.text,
        styles[variant],
        color && { color },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    textTransform: 'uppercase',
  },
});

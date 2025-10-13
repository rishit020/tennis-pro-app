import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CoachingFormScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coaching Form</Text>
      <Text style={styles.subtitle}>Screen is working!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ECC71',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});
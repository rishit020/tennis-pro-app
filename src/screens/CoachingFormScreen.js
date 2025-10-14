import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../theme/colors';

export default function CoachingFormScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!name || !email) {
      Alert.alert('Missing Info', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success!', 'Your coaching request has been submitted');
    setName('');
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={colors.gradient.secondary} style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="trophy" size={40} color={colors.textWhite} />
        </View>
        <Text style={styles.headerTitle}>Private Coaching</Text>
        <Text style={styles.headerSubtitle}>Book your session</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <LinearGradient colors={colors.gradient.accent} style={styles.submitGradient}>
              <Text style={styles.submitText}>Submit Request</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingTop: spacing.xxl, paddingBottom: spacing.xl, paddingHorizontal: spacing.lg, alignItems: 'center', borderBottomLeftRadius: borderRadius.xxl, borderBottomRightRadius: borderRadius.xxl },
  headerIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md },
  headerTitle: { fontSize: 30, fontWeight: '700', color: colors.textWhite, marginBottom: spacing.xs },
  headerSubtitle: { fontSize: 16, color: 'rgba(255, 255, 255, 0.9)' },
  scrollView: { flex: 1 },
  content: { padding: spacing.lg },
  form: { backgroundColor: colors.surface, padding: spacing.xl, borderRadius: borderRadius.xl, ...shadows.card },
  label: { fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: spacing.sm, marginTop: spacing.md },
  input: { backgroundColor: colors.surfaceVariant, padding: spacing.md, borderRadius: borderRadius.md, fontSize: 16, color: colors.text, borderWidth: 1, borderColor: colors.border },
  submitButton: { marginTop: spacing.xl, borderRadius: borderRadius.xl, overflow: 'hidden' },
  submitGradient: { padding: spacing.lg, alignItems: 'center', borderRadius: borderRadius.xl },
  submitText: { fontSize: 16, fontWeight: '600', color: colors.textWhite },
});

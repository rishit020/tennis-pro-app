import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../theme/colors';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={colors.gradient.primary} style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="information-circle" size={40} color={colors.textWhite} />
        </View>
        <Text style={styles.headerTitle}>About Us</Text>
        <Text style={styles.headerSubtitle}>Elite Tennis Coaching</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Mission</Text>
          <Text style={styles.cardText}>
            At TennisPro Coaching, we're dedicated to helping tennis players of all levels reach their full potential.
            Our nationally ranked USTA players provide personalized coaching that combines technical expertise with strategic insights.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Why Choose Us</Text>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            <Text style={styles.featureText}>USTA Certified Coaches</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            <Text style={styles.featureText}>500+ Satisfied Students</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            <Text style={styles.featureText}>24-Hour Response Time</Text>
          </View>
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
  card: { backgroundColor: colors.surface, padding: spacing.xl, borderRadius: borderRadius.xl, marginBottom: spacing.lg, ...shadows.card },
  cardTitle: { fontSize: 20, fontWeight: '600', color: colors.text, marginBottom: spacing.md },
  cardText: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  featureText: { fontSize: 16, color: colors.text, marginLeft: spacing.md },
});

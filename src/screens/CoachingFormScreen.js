import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, typography, spacing, shadows } from '../theme/colors';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
  skillLevel: Yup.string()
    .required('Please select your skill level'),
  goals: Yup.string()
    .min(10, 'Please provide more details about your goals')
    .required('Goals are required'),
  notes: Yup.string(),
});

const skillLevels = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Professional', value: 'professional' },
];

export default function CoachingFormScreen() {
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scaleValue = useSharedValue(1);

  const handlePressIn = () => {
    scaleValue.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scaleValue.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Booking Successful!',
        'Your coaching session request has been submitted. We will contact you within 24 hours to confirm your session.',
        [
          {
            text: 'OK',
            onPress: () => {
              resetForm();
              setSelectedSkillLevel('');
            }
          }
        ]
      );
    }, 2000);
  };

  const InputField = ({ label, value, onChangeText, placeholder, error, multiline = false }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  const SkillLevelSelector = ({ selectedValue, onSelect, error }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Skill Level *</Text>
      <View style={styles.skillLevelContainer}>
        {skillLevels.map((level) => (
          <TouchableOpacity
            key={level.value}
            style={[
              styles.skillLevelButton,
              selectedValue === level.value && styles.skillLevelButtonSelected
            ]}
            onPress={() => onSelect(level.value)}
          >
            <Text style={[
              styles.skillLevelText,
              selectedValue === level.value && styles.skillLevelTextSelected
            ]}>
              {level.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="trophy" size={32} color={colors.primary} />
          </View>
          <Text style={styles.headerTitle}>Private Coaching</Text>
          <Text style={styles.headerDescription}>
            Book a personalized coaching session with our nationally ranked USTA players. 
            Improve your technique, strategy, and overall game.
          </Text>
        </View>

        {/* Pricing Card */}
        <View style={styles.pricingCard}>
          <Text style={styles.pricingTitle}>Private Coaching</Text>
          <Text style={styles.pricingAmount}>$60/hour</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.featureText}>Personalized technique analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.featureText}>Strategy and game planning</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.featureText}>Video analysis included</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.featureText}>Flexible scheduling</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.featureText}>All skill levels welcome</Text>
            </View>
          </View>
        </View>

        {/* Booking Form */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Book Your Session</Text>
          
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              skillLevel: '',
              goals: '',
              notes: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
              <View style={styles.form}>
                <InputField
                  label="Full Name *"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder="Enter your full name"
                  error={touched.name && errors.name}
                />

                <InputField
                  label="Email *"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Enter your email address"
                  error={touched.email && errors.email}
                />

                <InputField
                  label="Phone Number *"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  placeholder="Enter your phone number"
                  error={touched.phone && errors.phone}
                />

                <SkillLevelSelector
                  selectedValue={selectedSkillLevel}
                  onSelect={(value) => {
                    setSelectedSkillLevel(value);
                    setFieldValue('skillLevel', value);
                  }}
                  error={touched.skillLevel && errors.skillLevel}
                />

                <InputField
                  label="Goals & Objectives *"
                  value={values.goals}
                  onChangeText={handleChange('goals')}
                  placeholder="Describe what you want to improve (e.g., serve technique, backhand, match strategy)"
                  error={touched.goals && errors.goals}
                  multiline={true}
                />

                <InputField
                  label="Additional Notes"
                  value={values.notes}
                  onChangeText={handleChange('notes')}
                  placeholder="Any specific requests or information you'd like to share"
                  multiline={true}
                />

                {/* Submit Buttons */}
                <View style={styles.buttonContainer}>
                  <AnimatedTouchableOpacity
                    style={[styles.submitButton, animatedStyle]}
                    onPress={handleSubmit}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={isSubmitting}
                  >
                    <LinearGradient
                      colors={isSubmitting ? 
                        ['#BDC3C7', '#95A5A6'] : 
                        colors.gradient.primary
                      }
                      style={styles.submitGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      {isSubmitting ? (
                        <Ionicons name="hourglass" size={20} color="#FFFFFF" />
                      ) : (
                        <Ionicons name="calendar" size={20} color="#FFFFFF" />
                      )}
                      <Text style={styles.submitButtonText}>
                        {isSubmitting ? 'Submitting...' : 'Book Session'}
                      </Text>
                    </LinearGradient>
                  </AnimatedTouchableOpacity>

                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => {
                      setSelectedSkillLevel('');
                      // Reset form values
                    }}
                  >
                    <Ionicons name="refresh" size={20} color={colors.textSecondary} />
                    <Text style={styles.resetButtonText}>Reset Form</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  headerDescription: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  pricingCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    alignItems: 'center',
    ...shadows.card,
  },
  pricingTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  pricingAmount: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  featuresList: {
    width: '100%',
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    ...typography.body2,
    color: colors.text,
    flex: 1,
  },
  formSection: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    ...shadows.card,
  },
  formTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  form: {
    gap: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    ...typography.body2,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  inputWrapper: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    ...typography.body1,
    color: colors.text,
    padding: spacing.md,
    minHeight: 48,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
  skillLevelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  skillLevelButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceVariant,
  },
  skillLevelButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  skillLevelText: {
    ...typography.body2,
    color: colors.text,
    fontWeight: '500',
  },
  skillLevelTextSelected: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  submitButton: {
    borderRadius: 16,
    ...shadows.medium,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: 16,
    gap: spacing.sm,
  },
  submitButtonText: {
    ...typography.button,
    color: '#FFFFFF',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceVariant,
    gap: spacing.sm,
  },
  resetButtonText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

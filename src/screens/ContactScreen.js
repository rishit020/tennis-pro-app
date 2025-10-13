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
  subject: Yup.string()
    .min(5, 'Subject must be at least 5 characters')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
});

export default function ContactScreen() {
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
        'Message Sent!',
        'Thank you for contacting us. We will get back to you within 24 hours.',
        [
          {
            text: 'OK',
            onPress: () => resetForm()
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <LinearGradient
        colors={colors.gradient.primary}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="location" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Location</Text>
          <Text style={styles.headerAddress}>
            3870 Cary Glen Blvd, Cary, NC 27519
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Contact Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Send Us a Message</Text>
          
          <Formik
            initialValues={{
              name: '',
              email: '',
              subject: '',
              message: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <View style={styles.nameEmailRow}>
                  <View style={styles.halfWidth}>
                    <InputField
                      label="First Name *"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      placeholder="Enter your first name"
                      error={touched.name && errors.name}
                    />
                  </View>
                  <View style={styles.halfWidth}>
                    <InputField
                      label="Email *"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      placeholder="Enter your email"
                      error={touched.email && errors.email}
                    />
                  </View>
                </View>

                <InputField
                  label="Phone Number"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  placeholder="Enter your phone number (optional)"
                />

                <InputField
                  label="Subject *"
                  value={values.subject}
                  onChangeText={handleChange('subject')}
                  placeholder="What is this about?"
                  error={touched.subject && errors.subject}
                />

                <InputField
                  label="Message *"
                  value={values.message}
                  onChangeText={handleChange('message')}
                  placeholder="Tell us how we can help you..."
                  error={touched.message && errors.message}
                  multiline={true}
                />

                {/* Submit Button */}
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
                      <Ionicons name="send" size={20} color="#FFFFFF" />
                    )}
                    <Text style={styles.submitButtonText}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Text>
                  </LinearGradient>
                </AnimatedTouchableOpacity>
              </View>
            )}
          </Formik>
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfoSection}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          
          <View style={styles.contactCards}>
            <View style={styles.contactCard}>
              <View style={styles.contactIcon}>
                <Ionicons name="call" size={24} color={colors.primary} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>(555) 123-4567</Text>
              </View>
            </View>

            <View style={styles.contactCard}>
              <View style={styles.contactIcon}>
                <Ionicons name="mail" size={24} color={colors.primary} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>info@tennispro.com</Text>
              </View>
            </View>

            <View style={styles.contactCard}>
              <View style={styles.contactIcon}>
                <Ionicons name="time" size={24} color={colors.primary} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Hours</Text>
                <Text style={styles.contactValue}>Mon-Fri: 8AM-8PM</Text>
                <Text style={styles.contactValue}>Sat-Sun: 9AM-6PM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqList}>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>How quickly will I receive video analysis?</Text>
              <Text style={styles.faqAnswer}>
                We typically provide detailed video analysis within 24 hours of submission.
              </Text>
            </View>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>What video formats do you accept?</Text>
              <Text style={styles.faqAnswer}>
                We accept MP4, MOV, and AVI formats with a maximum file size of 100MB.
              </Text>
            </View>
            
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Do you offer group coaching sessions?</Text>
              <Text style={styles.faqAnswer}>
                Yes! We offer both private and group coaching sessions. Contact us for more details.
              </Text>
            </View>
          </View>
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
  header: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerTitle: {
    ...typography.h2,
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  headerAddress: {
    ...typography.body1,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  content: {
    padding: spacing.lg,
  },
  formSection: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
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
  nameEmailRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfWidth: {
    flex: 1,
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
  submitButton: {
    borderRadius: 16,
    marginTop: spacing.md,
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
  contactInfoSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  contactCards: {
    gap: spacing.md,
  },
  contactCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.card,
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  contactValue: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '500',
  },
  faqSection: {
    marginBottom: spacing.xl,
  },
  faqList: {
    gap: spacing.lg,
  },
  faqItem: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    ...shadows.card,
  },
  faqQuestion: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  faqAnswer: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

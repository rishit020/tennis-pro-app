import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { colors, typography, spacing, shadows } from '../theme/colors';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function UploadVideoScreen() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const requestPermissions = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Please grant camera and media library permissions to upload videos.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const takeVideo = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 0.8,
        videoMaxDuration: 60, // 1 minute max
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedVideo(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to record video. Please try again.');
    }
  };

  const chooseFromLibrary = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 0.8,
        videoMaxDuration: 60,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedVideo(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select video. Please try again.');
    }
  };

  const validateVideo = (video) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const supportedFormats = ['mp4', 'mov', 'avi'];
    const fileExtension = video.uri.split('.').pop().toLowerCase();
    
    if (video.fileSize && video.fileSize > maxSize) {
      Alert.alert('File Too Large', 'Video must be under 100MB.');
      return false;
    }
    
    if (!supportedFormats.includes(fileExtension)) {
      Alert.alert('Unsupported Format', 'Please use MP4, MOV, or AVI format.');
      return false;
    }
    
    return true;
  };

  const submitVideo = async () => {
    if (!selectedVideo) {
      Alert.alert('No Video Selected', 'Please select or record a video first.');
      return;
    }

    if (!validateVideo(selectedVideo)) {
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setUploading(false);
          Alert.alert(
            'Upload Successful!',
            'Your video has been submitted for review. Our team will analyze it and get back to you within 24 hours.',
            [{ text: 'OK' }]
          );
          setSelectedVideo(null);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const ActionButton = ({ icon, title, onPress, gradient, style }) => (
    <AnimatedTouchableOpacity
      style={[styles.actionButton, style, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradient}
        style={styles.buttonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={icon} size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </AnimatedTouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Video Upload Options */}
        <View style={styles.uploadSection}>
          <View style={styles.actionButtons}>
            <ActionButton
              icon="videocam"
              title="Record Video"
              gradient={colors.gradient.primary}
              onPress={takeVideo}
              style={styles.primaryButton}
            />
            
            <ActionButton
              icon="folder"
              title="Choose Video"
              gradient={['#7F8C8D', '#95A5A6']}
              onPress={chooseFromLibrary}
              style={styles.secondaryButton}
            />
          </View>
        </View>

        {/* Video Requirements */}
        <View style={styles.requirementsCard}>
          <Text style={styles.requirementsTitle}>Video Requirements:</Text>
          <View style={styles.requirementsList}>
            <Text style={styles.requirementItem}>• Maximum file size: 100MB</Text>
            <Text style={styles.requirementItem}>• Supported formats: MP4, MOV, AVI</Text>
            <Text style={styles.requirementItem}>• Ensure good lighting and clear view</Text>
            <Text style={styles.requirementItem}>• Record from a side angle for best analysis</Text>
          </View>
        </View>

        {/* Video Preview */}
        {selectedVideo && (
          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>Selected Video:</Text>
            <View style={styles.videoPreview}>
              <Ionicons name="play-circle" size={48} color={colors.primary} />
              <Text style={styles.videoInfo}>
                {selectedVideo.fileName || 'Video File'}
              </Text>
              <Text style={styles.videoSize}>
                {selectedVideo.fileSize ? 
                  `${(selectedVideo.fileSize / (1024 * 1024)).toFixed(1)} MB` : 
                  'Size unknown'
                }
              </Text>
            </View>
          </View>
        )}

        {/* Upload Progress */}
        {uploading && (
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>Uploading Video...</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${uploadProgress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{uploadProgress}%</Text>
          </View>
        )}

        {/* Submit Section */}
        <View style={styles.submitSection}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!selectedVideo || uploading) && styles.submitButtonDisabled
            ]}
            onPress={submitVideo}
            disabled={!selectedVideo || uploading}
          >
            <LinearGradient
              colors={(!selectedVideo || uploading) ? 
                ['#BDC3C7', '#95A5A6'] : 
                colors.gradient.primary
              }
              style={styles.submitGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Submit for Review</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <Text style={styles.disclaimerText}>
            By submitting, you agree to receive coaching feedback via email or message. 
            Our team will review your video and get back to you soon.
          </Text>
        </View>

        {/* What You'll Receive */}
        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>What You'll Receive</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.benefitText}>Detailed technique analysis</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.benefitText}>Personalized improvement tips</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.benefitText}>Video breakdown with timestamps</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.benefitText}>Follow-up recommendations</Text>
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
  content: {
    padding: spacing.lg,
  },
  uploadSection: {
    marginBottom: spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    ...shadows.medium,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
    gap: spacing.sm,
  },
  primaryButton: {
    // Additional styles for primary button
  },
  secondaryButton: {
    // Additional styles for secondary button
  },
  buttonText: {
    ...typography.button,
    color: '#FFFFFF',
  },
  requirementsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  requirementsTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  requirementsList: {
    gap: spacing.sm,
  },
  requirementItem: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  previewCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  previewTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  videoPreview: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 12,
  },
  videoInfo: {
    ...typography.body1,
    color: colors.text,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  videoSize: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  progressTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    ...typography.body2,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  submitSection: {
    marginBottom: spacing.lg,
  },
  submitButton: {
    borderRadius: 16,
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  submitButtonDisabled: {
    opacity: 0.6,
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
  disclaimerText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  benefitsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    ...shadows.card,
  },
  benefitsTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  benefitsList: {
    gap: spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  benefitText: {
    ...typography.body2,
    color: colors.text,
    flex: 1,
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, borderRadius, shadows } from '../theme/colors';

export default function UploadVideoScreen() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need access to your media library.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setSelectedVideo(result.assets[0]);
      Alert.alert('Success!', 'Video selected successfully');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={colors.gradient.primary} style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="videocam" size={40} color={colors.textWhite} />
        </View>
        <Text style={styles.headerTitle}>Upload Your Video</Text>
        <Text style={styles.headerSubtitle}>Get expert feedback</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.uploadCard} onPress={pickVideo}>
          <LinearGradient colors={colors.gradient.secondary} style={styles.uploadGradient}>
            <Ionicons name="cloud-upload" size={48} color={colors.textWhite} />
            <Text style={styles.uploadTitle}>Choose Video</Text>
            <Text style={styles.uploadDescription}>Select from your device</Text>
          </LinearGradient>
        </TouchableOpacity>

        {selectedVideo && (
          <View style={styles.selectedCard}>
            <Ionicons name="checkmark-circle" size={32} color={colors.success} />
            <Text style={styles.selectedText}>Video selected</Text>
            <TouchableOpacity onPress={() => setSelectedVideo(null)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
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
  uploadCard: { borderRadius: borderRadius.xl, ...shadows.card, marginBottom: spacing.xl },
  uploadGradient: { padding: spacing.xl, alignItems: 'center', minHeight: 200, justifyContent: 'center', borderRadius: borderRadius.xl },
  uploadTitle: { fontSize: 20, fontWeight: '600', color: colors.textWhite, marginTop: spacing.md },
  uploadDescription: { fontSize: 14, color: 'rgba(255, 255, 255, 0.9)', marginTop: spacing.xs },
  selectedCard: { backgroundColor: colors.surface, padding: spacing.xl, borderRadius: borderRadius.lg, alignItems: 'center', ...shadows.card },
  selectedText: { fontSize: 16, color: colors.text, marginTop: spacing.sm },
  removeText: { fontSize: 14, color: colors.error, marginTop: spacing.md },
});

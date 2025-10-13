import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../theme/colors';

export default function AboutScreen() {

  const AchievementCard = ({ icon, title, description, gradient }) => (
    <TouchableOpacity
      style={styles.achievementCard}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradient}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const TestimonialCard = ({ name, role, quote, rating }) => (
    <View style={styles.testimonialCard}>
      <View style={styles.quoteContainer}>
        <Ionicons name="quote" size={24} color={colors.primary} />
      </View>
      <Text style={styles.quoteText}>"{quote}"</Text>
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, index) => (
          <Ionicons
            key={index}
            name={index < rating ? "star" : "star-outline"}
            size={16}
            color={colors.secondary}
          />
        ))}
      </View>
      <View style={styles.testimonialFooter}>
        <Text style={styles.testimonialName}>{name}</Text>
        <Text style={styles.testimonialRole}>{role}</Text>
      </View>
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
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="tennisball" size={40} color="#FFFFFF" />
            </View>
            <View style={styles.logoText}>
              <Text style={styles.appTitle}>TennisPro</Text>
              <Text style={styles.appSubtitle}>Coaching</Text>
            </View>
          </View>
          <Text style={styles.tagline}>Elite Tennis Coaching</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionDescription}>
            At TennisPro Coaching, we're dedicated to helping tennis players of all levels 
            reach their full potential. Our nationally ranked USTA players provide personalized 
            coaching that combines technical expertise with strategic insights to elevate your game.
          </Text>
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Achievements</Text>
          <View style={styles.achievementsGrid}>
            <AchievementCard
              icon="trophy"
              title="USTA Certified"
              description="All coaches are nationally ranked USTA players"
              gradient={colors.gradient.primary}
            />
            <AchievementCard
              icon="people"
              title="500+ Students"
              description="Successfully coached hundreds of players"
              gradient={colors.gradient.secondary}
            />
            <AchievementCard
              icon="star"
              title="5-Star Rating"
              description="Consistently rated excellent by our students"
              gradient={['#3498DB', '#2980B9']}
            />
            <AchievementCard
              icon="time"
              title="24hr Response"
              description="Quick turnaround on video analysis"
              gradient={['#9B59B6', '#8E44AD']}
            />
          </View>
        </View>

        {/* Team Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meet Our Team</Text>
          <View style={styles.teamCard}>
            <View style={styles.teamMember}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={32} color={colors.primary} />
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>Sarah Johnson</Text>
                <Text style={styles.memberRole}>Head Coach & USTA Pro</Text>
                <Text style={styles.memberBio}>
                  Former NCAA Division I player with 10+ years of coaching experience. 
                  Specializes in technique refinement and match strategy.
                </Text>
              </View>
            </View>
            
            <View style={styles.teamMember}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={32} color={colors.primary} />
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>Mike Rodriguez</Text>
                <Text style={styles.memberRole}>Senior Coach & Video Analyst</Text>
                <Text style={styles.memberBio}>
                  Professional video analysis expert with advanced biomechanics knowledge. 
                  Helps players understand their technique through detailed breakdowns.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Our Students Say</Text>
          <View style={styles.testimonialsContainer}>
            <TestimonialCard
              name="Alex Thompson"
              role="Advanced Player"
              quote="The video analysis completely transformed my serve technique. I've never understood my form better!"
              rating={5}
            />
            <TestimonialCard
              name="Emma Davis"
              role="Intermediate Player"
              quote="The personalized coaching helped me break through my plateau. My game has improved dramatically."
              rating={5}
            />
            <TestimonialCard
              name="James Wilson"
              role="Beginner"
              quote="Starting tennis at 35 seemed daunting, but the coaches made it fun and easy to learn."
              rating={5}
            />
          </View>
        </View>

        {/* Contact CTA */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Elevate Your Game?</Text>
          <Text style={styles.ctaDescription}>
            Join hundreds of players who have improved their tennis with our expert coaching.
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <LinearGradient
              colors={colors.gradient.primary}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              <Text style={styles.ctaButtonText}>Get Started Today</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 TennisPro Coaching</Text>
          <Text style={styles.footerSubtext}>Professional Tennis Coaching Services</Text>
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  logoText: {
    alignItems: 'flex-start',
  },
  appTitle: {
    ...typography.h2,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  appSubtitle: {
    ...typography.body1,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: -spacing.xs,
  },
  tagline: {
    ...typography.body2,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  sectionDescription: {
    ...typography.body1,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  achievementCard: {
    width: '48%',
    borderRadius: 16,
    ...shadows.card,
  },
  cardGradient: {
    borderRadius: 16,
    padding: spacing.lg,
  },
  cardContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    ...typography.h4,
    color: '#FFFFFF',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  cardDescription: {
    ...typography.caption,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 16,
  },
  teamCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    ...shadows.card,
  },
  teamMember: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  memberRole: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  memberBio: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  testimonialsContainer: {
    gap: spacing.lg,
  },
  testimonialCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    ...shadows.card,
  },
  quoteContainer: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quoteText: {
    ...typography.body1,
    color: colors.text,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  testimonialFooter: {
    alignItems: 'center',
  },
  testimonialName: {
    ...typography.body2,
    color: colors.text,
    fontWeight: '600',
  },
  testimonialRole: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  ctaSection: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...shadows.card,
  },
  ctaTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  ctaDescription: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  ctaButton: {
    borderRadius: 16,
    ...shadows.medium,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: 16,
    gap: spacing.sm,
  },
  ctaButtonText: {
    ...typography.button,
    color: '#FFFFFF',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  footerSubtext: {
    ...typography.caption,
    color: colors.textLight,
  },
});

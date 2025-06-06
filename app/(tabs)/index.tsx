import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Sparkles, Gift } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

const loveQuotes = [
  "Every moment with you feels like a beautiful dream come true.",
  "You are my sunshine on the cloudiest days.",
  "In your eyes, I found my home.",
  "Love is not just a feeling, it's you.",
  "You make my heart skip a beat every single day.",
];

const FloatingHeart = ({ delay }: { delay: number }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <View style={[styles.floatingHeart, { left: Math.random() * (width - 30) }]}>
      <Heart size={20} color="#FF69B4" fill="#FF69B4" />
    </View>
  );
};

export default function HomeScreen() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [hearts, setHearts] = useState<number[]>([]);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const addHeart = () => {
    triggerHaptic();
    const newHeart = Date.now();
    setHearts(prev => [...prev, newHeart]);
    
    // Remove heart after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(id => id !== newHeart));
    }, 3000);
  };

  const nextQuote = () => {
    triggerHaptic();
    setCurrentQuote((prev) => (prev + 1) % loveQuotes.length);
  };

  return (
    <LinearGradient
      colors={['#FF69B4', '#FFB6C1', '#FFC0CB']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Floating Hearts */}
        {hearts.map((id, index) => (
          <FloatingHeart key={id} delay={index * 100} />
        ))}

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>To Jay with Love</Text>
          <Text style={styles.subtitle}>💕 A special place for us 💕</Text>
        </View>

        {/* Main Love Quote Card */}
        <TouchableOpacity style={styles.quoteCard} onPress={nextQuote}>
          <View style={styles.quoteHeader}>
            <Sparkles size={24} color="#FF69B4" />
            <Text style={styles.quoteTitle}>Daily Love Note</Text>
            <Sparkles size={24} color="#FF69B4" />
          </View>
          <Text style={styles.quoteText}>
            "{loveQuotes[currentQuote]}"
          </Text>
          <Text style={styles.tapHint}>Tap for another message</Text>
        </TouchableOpacity>

        {/* Interactive Heart Button */}
        <TouchableOpacity style={styles.heartButton} onPress={addHeart}>
          <Heart size={60} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={styles.heartButtonText}>Send Love</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <Gift size={32} color="#FF69B4" />
            <Text style={styles.actionText}>Surprise</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <Heart size={32} color="#FF69B4" />
            <Text style={styles.actionText}>Love Counter</Text>
          </TouchableOpacity>
        </View>

        {/* Love Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Our Love Journey</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>∞</Text>
              <Text style={styles.statLabel}>Days of Love</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>💕</Text>
              <Text style={styles.statLabel}>Hearts Shared</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>🌟</Text>
              <Text style={styles.statLabel}>Special Moments</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'DancingScript-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quoteTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF69B4',
    marginHorizontal: 12,
  },
  quoteText: {
    fontSize: 18,
    fontFamily: 'DancingScript-Regular',
    color: '#333',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 12,
  },
  tapHint: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  heartButton: {
    backgroundColor: 'rgba(255, 105, 180, 0.9)',
    borderRadius: 50,
    width: 120,
    height: 120,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  heartButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginTop: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  actionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FF69B4',
    marginTop: 8,
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 24,
  },
  statsTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF69B4',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
  },
  floatingHeart: {
    position: 'absolute',
    top: height * 0.8,
    zIndex: 1000,
    opacity: 0.8,
  },
});
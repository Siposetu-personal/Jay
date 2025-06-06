import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Heart, Plus, Calendar } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const imageSize = (width - 60) / 2;

interface Memory {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
}

const memories: Memory[] = [
  {
    id: '1',
    title: 'Our First Date',
    date: '2024-01-14',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'The day everything changed ❤️',
  },
  {
    id: '2',
    title: 'Beach Sunset',
    date: '2024-02-20',
    image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Watching the sunset together',
  },
  {
    id: '3',
    title: 'Cozy Evening',
    date: '2024-03-15',
    image: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Movie night at home 🍿',
  },
  {
    id: '4',
    title: 'Adventure Day',
    date: '2024-04-10',
    image: 'https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Exploring new places together',
  },
];

export default function MemoriesScreen() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleMemoryPress = (memory: Memory) => {
    triggerHaptic();
    setSelectedMemory(memory);
  };

  if (selectedMemory) {
    return (
      <LinearGradient
        colors={['#FFB6C1', '#FFC0CB', '#FFE4E1']}
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedMemory(null)}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.detailContainer}>
          <Image source={{ uri: selectedMemory.image }} style={styles.detailImage} />
          <View style={styles.detailContent}>
            <Text style={styles.detailTitle}>{selectedMemory.title}</Text>
            <View style={styles.detailDateContainer}>
              <Calendar size={16} color="#FF69B4" />
              <Text style={styles.detailDate}>{formatDate(selectedMemory.date)}</Text>
            </View>
            <Text style={styles.detailDescription}>{selectedMemory.description}</Text>
            
            <TouchableOpacity style={styles.loveButton} onPress={triggerHaptic}>
              <Heart size={24} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.loveButtonText}>Love This Memory</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#FFB6C1', '#FFC0CB', '#FFE4E1']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Camera size={28} color="#FF69B4" />
        <Text style={styles.headerTitle}>Our Memories</Text>
        <Heart size={28} color="#FF69B4" fill="#FF69B4" />
      </View>

      <ScrollView style={styles.memoriesContainer} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.addMemoryButton} onPress={triggerHaptic}>
          <Plus size={24} color="#FF69B4" />
          <Text style={styles.addMemoryText}>Add New Memory</Text>
        </TouchableOpacity>

        <View style={styles.memoriesGrid}>
          {memories.map((memory) => (
            <TouchableOpacity
              key={memory.id}
              style={styles.memoryCard}
              onPress={() => handleMemoryPress(memory)}
            >
              <Image source={{ uri: memory.image }} style={styles.memoryImage} />
              <View style={styles.memoryOverlay}>
                <Text style={styles.memoryTitle}>{memory.title}</Text>
                <Text style={styles.memoryDate}>{formatDate(memory.date)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Memory Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{memories.length}</Text>
              <Text style={styles.statLabel}>Memories</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>💕</Text>
              <Text style={styles.statLabel}>Favorite</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>📸</Text>
              <Text style={styles.statLabel}>Photos</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF69B4',
    marginHorizontal: 12,
  },
  memoriesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addMemoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#FFB6C1',
    borderStyle: 'dashed',
  },
  addMemoryText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FF69B4',
    marginLeft: 8,
  },
  memoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  memoryCard: {
    width: imageSize,
    height: imageSize,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  memoryImage: {
    width: '100%',
    height: '100%',
  },
  memoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
  },
  memoryTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  memoryDate: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 100,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF69B4',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FF69B4',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 4,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FF69B4',
  },
  detailContainer: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  detailImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 24,
  },
  detailContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
  },
  detailTitle: {
    fontSize: 28,
    fontFamily: 'DancingScript-Bold',
    color: '#FF69B4',
    textAlign: 'center',
    marginBottom: 12,
  },
  detailDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  detailDate: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginLeft: 8,
  },
  detailDescription: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
  },
  loveButton: {
    backgroundColor: '#FF69B4',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
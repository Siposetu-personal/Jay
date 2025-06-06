import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Settings as SettingsIcon,
  Bell,
  Heart,
  Moon,
  Volume2,
  Shield,
  Info,
  ChevronRight,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  type: 'toggle' | 'navigation';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sounds, setSounds] = useState(true);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const settings: SettingItem[] = [
    {
      id: 'notifications',
      title: 'Love Notifications',
      subtitle: 'Get daily love reminders',
      icon: <Bell size={24} color="#FF69B4" />,
      type: 'toggle',
      value: notifications,
      onToggle: (value) => {
        triggerHaptic();
        setNotifications(value);
      },
    },
    {
      id: 'sounds',
      title: 'Sound Effects',
      subtitle: 'Heart sounds and haptics',
      icon: <Volume2 size={24} color="#FF69B4" />,
      type: 'toggle',
      value: sounds,
      onToggle: (value) => {
        triggerHaptic();
        setSounds(value);
      },
    },
    {
      id: 'darkmode',
      title: 'Dark Mode',
      subtitle: 'Coming soon...',
      icon: <Moon size={24} color="#FF69B4" />,
      type: 'toggle',
      value: darkMode,
      onToggle: (value) => {
        triggerHaptic();
        setDarkMode(value);
      },
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Protect your love messages',
      icon: <Shield size={24} color="#FF69B4" />,
      type: 'navigation',
      onPress: () => {
        triggerHaptic();
        // Navigate to privacy settings
      },
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'Version 1.0.0',
      icon: <Info size={24} color="#FF69B4" />,
      type: 'navigation',
      onPress: () => {
        triggerHaptic();
        // Navigate to about screen
      },
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === 'toggle'}
      >
        <View style={styles.settingLeft}>
          <View style={styles.settingIcon}>{item.icon}</View>
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>{item.title}</Text>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        <View style={styles.settingRight}>
          {item.type === 'toggle' ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#CCC', true: '#FFB6C1' }}
              thumbColor={item.value ? '#FF69B4' : '#FFF'}
            />
          ) : (
            <ChevronRight size={20} color="#CCC" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#FFB6C1', '#FFC0CB', '#FFE4E1']}
      style={styles.container}
    >
      <View style={styles.header}>
        <SettingsIcon size={28} color="#FF69B4" />
        <Text style={styles.headerTitle}>Settings</Text>
        <Heart size={28} color="#FF69B4" fill="#FF69B4" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Heart size={40} color="#FFFFFF" fill="#FFFFFF" />
          </View>
          <Text style={styles.profileName}>Jay & You</Text>
          <Text style={styles.profileSubtitle}>Love Connection</Text>
        </View>

        {/* Settings List */}
        <View style={styles.settingsContainer}>
          {settings.map(renderSettingItem)}
        </View>

        {/* Love Stats */}
        <View style={styles.loveStatsContainer}>
          <Text style={styles.loveStatsTitle}>Your Love Journey</Text>
          <View style={styles.loveStatsGrid}>
            <View style={styles.loveStatItem}>
              <Text style={styles.loveStatNumber}>365</Text>
              <Text style={styles.loveStatLabel}>Days Together</Text>
            </View>
            <View style={styles.loveStatItem}>
              <Text style={styles.loveStatNumber}>1,247</Text>
              <Text style={styles.loveStatLabel}>Messages Sent</Text>
            </View>
            <View style={styles.loveStatItem}>
              <Text style={styles.loveStatNumber}>∞</Text>
              <Text style={styles.loveStatLabel}>Love Level</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with 💕 for Jay</Text>
          <Text style={styles.footerSubtext}>
            "Every love story is beautiful, but ours is my favorite"
          </Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF69B4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  profileName: {
    fontSize: 22,
    fontFamily: 'DancingScript-Bold',
    color: '#FF69B4',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  settingsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 182, 193, 0.3)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 105, 180, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 16,
  },
  loveStatsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loveStatsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF69B4',
    textAlign: 'center',
    marginBottom: 20,
  },
  loveStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loveStatItem: {
    alignItems: 'center',
  },
  loveStatNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FF69B4',
  },
  loveStatLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingBottom: 100,
  },
  footerText: {
    fontSize: 16,
    fontFamily: 'DancingScript-Bold',
    color: '#FF69B4',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 40,
  },
});
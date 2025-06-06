import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Heart, MessageCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  type: 'sent' | 'received';
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Good morning, my love! Hope your day is as beautiful as you are 💕',
    timestamp: new Date(Date.now() - 3600000),
    type: 'received',
  },
  {
    id: '2',
    text: 'You always know how to make me smile! I love you so much ❤️',
    timestamp: new Date(Date.now() - 3000000),
    type: 'sent',
  },
  {
    id: '3',
    text: 'Can\'t wait to see you tonight! I have a surprise for you 🎁',
    timestamp: new Date(Date.now() - 1800000),
    type: 'received',
  },
];

export default function MessagesScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      triggerHaptic();
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        timestamp: new Date(),
        type: 'sent',
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <LinearGradient
      colors={['#FFB6C1', '#FFC0CB', '#FFE4E1']}
      style={styles.container}
    >
      <View style={styles.header}>
        <MessageCircle size={28} color="#FF69B4" />
        <Text style={styles.headerTitle}>Love Messages</Text>
        <Heart size={28} color="#FF69B4" fill="#FF69B4" />
      </View>

      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.type === 'sent' ? styles.sentWrapper : styles.receivedWrapper,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.type === 'sent' ? styles.sentBubble : styles.receivedBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.type === 'sent' ? styles.sentText : styles.receivedText,
                ]}
              >
                {message.text}
              </Text>
              <Text
                style={[
                  styles.timestamp,
                  message.type === 'sent' ? styles.sentTimestamp : styles.receivedTimestamp,
                ]}
              >
                {formatTime(message.timestamp)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a love message..."
          placeholderTextColor="#999"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Send size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  sentWrapper: {
    alignItems: 'flex-end',
  },
  receivedWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sentBubble: {
    backgroundColor: '#FF69B4',
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  sentTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
  },
  receivedTimestamp: {
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 105, 180, 0.2)',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    maxHeight: 100,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#FFB6C1',
  },
  sendButton: {
    backgroundColor: '#FF69B4',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#CCC',
    shadowOpacity: 0,
    elevation: 0,
  },
});
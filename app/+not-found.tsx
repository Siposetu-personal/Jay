import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Home } from 'lucide-react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <LinearGradient
        colors={['#FF69B4', '#FFB6C1', '#FFC0CB']}
        style={styles.container}
      >
        <View style={styles.content}>
          <Heart size={80} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={styles.title}>Lost in Love?</Text>
          <Text style={styles.subtitle}>
            This page doesn't exist, but our love does! 💕
          </Text>
          <Link href="/" style={styles.link}>
            <View style={styles.button}>
              <Home size={20} color="#FF69B4" />
              <Text style={styles.buttonText}>Go back home</Text>
            </View>
          </Link>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'DancingScript-Bold',
    color: '#FFFFFF',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.9,
  },
  link: {
    textDecorationLine: 'none',
  },
  button: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF69B4',
    marginLeft: 8,
  },
});
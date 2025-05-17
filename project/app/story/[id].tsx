import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
// Import a video player component
import { Video } from 'expo-av'; // Make sure expo-av is installed
import { fetchStoryById, markStoryAsViewed } from '@/utils/api';
import localVideo from '../../assets/images/noe.mp4';

export default function StoryScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState(null);

  useEffect(() => {
    const loadStory = async () => {
      // API integration point - fetch story details
      const storyData = await fetchStoryById(id);
      if (storyData) {
        setStory(storyData);
        // API integration point - mark story as viewed
        markStoryAsViewed(id);
      }
      setLoading(false);
    };
    loadStory();
  }, [id]);

  if (loading || !story) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Loading...</Text>
        </View>
        <ActivityIndicator size="large" color="#8A4FFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{"story.title"}</Text>
      </View>
      <View style={styles.videoContainer}>
        <Video
          source={localVideo}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          useNativeControls
          style={styles.video}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#8A4FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  video: {
    width: 240, // 1:1 aspect ratio
    height: 250, // Adjust as needed
    backgroundColor: '#000',
    borderRadius: 12,
  },
});
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { BookOpen, Star } from 'lucide-react-native';
import FeaturedStory from '@/components/FeaturedStory';
import RecentlyViewed from '@/components/RecentlyViewed';
import { fetchFeaturedStories, fetchRecentlyViewed } from '@/utils/api';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [recentStories, setRecentStories] = useState([]);

  useEffect(() => {
    // Here we would load data from the API
    // For now, using mock data
    
    // API call integration point
    // Replace this with actual API calls:
    // fetchFeaturedStories().then(data => setFeaturedStories(data));
    // fetchRecentlyViewed().then(data => setRecentStories(data));
    
    // Mock data for demo
    setFeaturedStories([
      { id: '1', title: 'David & Goliath', image: 'https://i.postimg.cc/gkRVHJRZ/5.png', description: 'David defeats the giant Goliath' },
      { id: '2', title: 'David Plays for Saul', image: 'https://i.postimg.cc/GpQw8dq0/frame4.png', description: 'David calms King Saul with music' },
      { id: '2', title: 'Noah`s Ark', image: 'https://i.postimg.cc/1XhJcH2v/noah-s-ark.png', description: 'David calms King Saul with music' }
    ]);
    
    setRecentStories([
      { id: '4', title: 'David & Goliath', image: 'https://i.postimg.cc/gkRVHJRZ/5.png'},
      { id: '5', title: 'David Plays for Saul', image: 'https://i.postimg.cc/GpQw8dq0/frame4.png'}
    ]);
    
    setLoading(false);
  }, []);

  const navigateToChapters = () => {
    router.push('/chapters');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A4FFF" />
        <Text style={styles.loadingText}>Loading amazing Bible stories...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to Bible Stories!</Text>
        <Text style={styles.welcomeSubtitle}>
          Explore amazing stories from the Bible
        </Text>
        <TouchableOpacity style={styles.exploreButton} onPress={navigateToChapters}>
          <BookOpen size={20} color="#FFFFFF" />
          <Text style={styles.exploreButtonText}>Explore Chapters</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Stories</Text>
          <Star size={20} color="#FFD166" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {featuredStories.map((story) => (
            <FeaturedStory 
              key={story.id} 
              story={story} 
              onPress={() => router.push(`/story/${story.id}`)} 
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recently Viewed</Text>
        <View style={styles.recentGrid}>
          {recentStories.map((story) => (
            <RecentlyViewed 
              key={story.id} 
              story={story} 
              onPress={() => router.push(`/story/${story.id}`)} 
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8A4FFF',
  },
  welcomeSection: {
    backgroundColor: '#87CEEB',
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 8,
  },
  horizontalScroll: {
    marginLeft: -8,
  },
  recentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
});
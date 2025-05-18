import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  ActivityIndicator 
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Book } from 'lucide-react-native';
import { fetchStoryById } from '@/utils/api';

// Mock data for chapter stories - replace with API call
const getStoriesForChapter = (chapterId) => {
  // API integration point - fetch stories for a chapter
  const mockStories = {
    '1': [
      { 
        id: '1', 
        title: 'David & Goliath', 
        description: 'David defeats the giant Goliath',
        image: 'https://i.postimg.cc/gkRVHJRZ/5.png',
        duration: ' < 1 min'
      },
      { 
        id: '5', 
        title: 'David Plays for Saul', 
        description: 'David calms King Saul with music',
        image: 'https://i.postimg.cc/GpQw8dq0/frame4.png',
        duration: '< 1 min'
      }
    ],
    '2': [
      { 
        id: '9', 
        title: 'Moses and the Burning Bush', 
        description: 'God speaks to Moses',
        image: 'https://i.postimg.cc/g2z1CfGN/6.png',
        duration: '< 1 min'
      }
    ],
    '3': [
      { 
        id: '13', 
        title: "Noah's Ark", 
        description: 'Faith and courage through the flood',
        image: "https://i.postimg.cc/1XhJcH2v/noah-s-ark.png",
        duration: '< 1 min'
      },
    ],
  };
  
  return mockStories[chapterId] || [];
};

// Mock data for chapter info - replace with API call
const getChapterInfo = (chapterId) => {
  console.log("hello")
  // API integration point - fetch chapter info
  const chapters = {
    '1': { 
      title: 'David', 
      description: 'A man after God\'s own heart', 
      image: 'https://i.postimg.cc/qvtJyVyz/david.png'
    },
    '2': { 
      title: 'Moses', 
      description: 'Freedom from slavery in Egypt', 
      image: 'https://i.postimg.cc/hv83w0wk/moses2.png'
    },
    '3': {
      title: 'Noah',
      description: 'Faith and courage through the flood',
      image: 'https://i.postimg.cc/BnP2nvZ6/Noe2.png'
    }
  };
  
  return chapters[chapterId] || { title: 'Unknown', description: '', image: '' };
};

export default function ChapterDetailScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useState(null);
  const [stories, setStories] = useState([]);
  
  useEffect(() => {
    const loadChapterData = async () => {
      // API integration points
      const chapterInfo = getChapterInfo(id);
      const chapterStories = getStoriesForChapter(id);
      
      setChapter(chapterInfo);
      setStories(chapterStories);
      setLoading(false);
    };
    
    loadChapterData();
  }, [id]);
  
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Loading...</Text>
        </View>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#8A4FFF" />
          <Text style={styles.loadingText}>Loading chapter...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>{chapter.title}</Text>
      </View>
      
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <Image source={{ uri: chapter.image }} style={styles.headerImage} />
            <View style={styles.overlay}>
              <Text style={styles.headerTitle}>{chapter.title}</Text>
              <Text style={styles.headerDescription}>{chapter.description}</Text>
              <View style={styles.storyCountContainer}>
                <Book size={16} color="#FFFFFF" />
                <Text style={styles.storyCount}>{stories.length} Stories</Text>
              </View>
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.storyItem}
            onPress={() => router.push(`/story/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.storyImage} />
            <View style={styles.storyContent}>
              <Text style={styles.storyTitle}>{item.title}</Text>
              <Text style={styles.storyDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.storyMeta}>
                <Text style={styles.storyDuration}>{item.duration}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No stories found in this chapter</Text>
          </View>
        }
      />
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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8A4FFF',
  },
  navBar: {
    backgroundColor: '#8A4FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    
  },
  headerContainer: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    paddingLeft: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 12,
  },
  storyCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyCount: {
    marginLeft: 8,
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  listContent: {
    paddingBottom: 16,

  },
  storyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  storyImage: {
    width: 120,
    height: '100%',
  },
  storyContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  storyDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  storyMeta: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyDuration: {
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});
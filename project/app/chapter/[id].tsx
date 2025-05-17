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
        title: 'Noah\'s Ark', 
        description: 'The story of Noah and the great flood',
        image: 'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg',
        duration: '3 min'
      },
      { 
        id: '5', 
        title: 'Adam and Eve', 
        description: 'The first humans in the Garden of Eden',
        image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg',
        duration: '4 min'
      },
      { 
        id: '6', 
        title: 'Cain and Abel', 
        description: 'A story about two brothers',
        image: 'https://images.pexels.com/photos/7693978/pexels-photo-7693978.jpeg',
        duration: '2 min'
      },
      { 
        id: '7', 
        title: 'Tower of Babel', 
        description: 'How different languages began',
        image: 'https://images.pexels.com/photos/7062/man-people-walking-path.jpg',
        duration: '3 min'
      },
      { 
        id: '8', 
        title: 'Abraham and Isaac', 
        description: 'A test of faith',
        image: 'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg',
        duration: '4 min'
      }
    ],
    '2': [
      { 
        id: '9', 
        title: 'Moses in the Basket', 
        description: 'A baby rescued from the river',
        image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
        duration: '3 min'
      },
      { 
        id: '10', 
        title: 'The Burning Bush', 
        description: 'God speaks to Moses',
        image: 'https://images.pexels.com/photos/5767616/pexels-photo-5767616.jpeg',
        duration: '3 min'
      },
      { 
        id: '11', 
        title: 'The Ten Plagues', 
        description: 'Troubles in Egypt',
        image: 'https://images.pexels.com/photos/6157042/pexels-photo-6157042.jpeg',
        duration: '5 min'
      },
      { 
        id: '12', 
        title: 'Crossing the Red Sea', 
        description: 'A miraculous escape',
        image: 'https://images.pexels.com/photos/1001778/pexels-photo-1001778.jpeg',
        duration: '4 min'
      }
    ],
    '3': [
      { 
        id: '13', 
        title: 'Daniel in the Lion\'s Den', 
        description: 'Faith protects Daniel from lions',
        image: 'https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg',
        duration: '3 min'
      },
      { 
        id: '14', 
        title: 'The Fiery Furnace', 
        description: 'Three friends who wouldn\'t bow down',
        image: 'https://images.pexels.com/photos/266463/pexels-photo-266463.jpeg',
        duration: '4 min'
      },
      { 
        id: '15', 
        title: 'The Writing on the Wall', 
        description: 'A mysterious message appears',
        image: 'https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg',
        duration: '3 min'
      }
    ],
    '4': [
      { 
        id: '4', 
        title: 'Jonah and the Whale', 
        description: 'A prophet swallowed by a big fish',
        image: 'https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg',
        duration: '3 min'
      }
    ]
  };
  
  return mockStories[chapterId] || [];
};

// Mock data for chapter info - replace with API call
const getChapterInfo = (chapterId) => {
  // API integration point - fetch chapter info
  const chapters = {
    '1': { 
      title: 'Genesis', 
      description: 'The beginning of everything', 
      image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg'
    },
    '2': { 
      title: 'Exodus', 
      description: 'Freedom from slavery in Egypt', 
      image: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg'
    },
    '3': {
      title: 'Daniel',
      description: 'Faith and courage in Babylon',
      image: 'https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg'
    },
    '4': {
      title: 'Jonah',
      description: 'Adventures with a big fish',
      image: 'https://images.pexels.com/photos/3155726/pexels-photo-3155726.jpeg'
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
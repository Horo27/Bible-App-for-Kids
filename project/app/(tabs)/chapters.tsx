import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, TextInput } from 'react-native';
import { router, useFocusEffect } from 'expo-router'; // Added useFocusEffect
import ChapterItem from '@/components/ChapterItem';
import { fetchChapters } from '@/utils/api'; // Assuming this fetches chapter list
import { getHeartStatus, HeartStatus, MAX_HEARTS } from '@/utils/heartManager'; // Import
import { Heart, Search} from 'lucide-react-native'; // Import


export default function ChaptersScreen() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
   const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [heartStatus, setHeartStatus] = useState<HeartStatus>({ hearts: MAX_HEARTS, isBlocked: false });

  useEffect(() => {
    // API integration point - fetch chapters from backend
    const loadChapters = async () => {
      const currentHeartStatus = await getHeartStatus();
      setHeartStatus(currentHeartStatus);
      const chaptersData = await fetchChapters();
      setChapters(chaptersData);
      setLoading(false);
    };
    
    loadChapters();
  }, []);

  const filteredChapters = chapters.filter(chapter => 
    chapter.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHeartsDisplay = () => (
    <View style={styles.heartsHeaderContainer}>
      {Array.from({ length: MAX_HEARTS }).map((_, i) => (
        <Heart
          key={i}
          size={28}
          color={i < heartStatus.hearts ? '#FF0000' : '#BDBDBD'}
          fill={i < heartStatus.hearts ? '#FF0000' : 'none'}
          style={{ marginRight: 5 }}
        />
      ))}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bible Chapters</Text>
          {/* Optionally show placeholder hearts or nothing while loading */}
        </View>
        <ActivityIndicator size="large" color="#8A4FFF" style={styles.centered} />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bible Chapters</Text>
        {renderHeartsDisplay()}
      </View>
      <Search size={20} color="#6B7280" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search chapters..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#9CA3AF"
      />
       <FlatList
        data={filteredChapters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChapterItem
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            storyCount={item.storyCount}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No chapters found</Text>
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
  header: {
    backgroundColor: '#8A4FFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // To space title and hearts
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heartsHeaderContainer: { // Renamed for clarity from StoryScreen
    flexDirection: 'row',
  },
  listContentContainer: {
    paddingHorizontal: 8, // Add some padding for list items
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  blockMessageContainer: { // Copied from StoryScreen styles, can be centralized
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  blockMessageText: { // Copied from StoryScreen styles
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    marginTop: 15,
    backgroundColor: '#8A4FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
});
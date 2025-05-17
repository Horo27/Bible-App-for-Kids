import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  Animated,
  Dimensions 
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react-native';
import StorySlide from '@/components/StorySlide';
import AudioPlayer from '@/components/AudioPlayer';
import { fetchStoryById, markStoryAsViewed } from '@/utils/api';

const { width } = Dimensions.get('window');

export default function StoryScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
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
  
  const handleNext = () => {
    if (!story || currentSlide >= story.slides.length - 1) return;
    
    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentSlide(currentSlide + 1);
      
      // Scroll to the next slide
      scrollViewRef.current?.scrollTo({
        x: width * (currentSlide + 1),
        animated: false,
      });
      
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };
  
  const handlePrevious = () => {
    if (!story || currentSlide <= 0) return;
    
    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentSlide(currentSlide - 1);
      
      // Scroll to the previous slide
      scrollViewRef.current?.scrollTo({
        x: width * (currentSlide - 1),
        animated: false,
      });
      
      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };
  
  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slideIndex !== currentSlide) {
      setCurrentSlide(slideIndex);
    }
  };
  
  if (loading || !story) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{story.title}</Text>
      </View>
      
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEnabled={false}
      >
        {story.slides.map((slide, index) => (
          <StorySlide
            key={index}
            image={slide.image}
            text={slide.text}
            fadeAnim={fadeAnim}
          />
        ))}
      </ScrollView>
      
      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          onPress={handlePrevious}
          style={[styles.navButton, currentSlide === 0 && styles.navButtonDisabled]}
          disabled={currentSlide === 0}
        >
          <ChevronLeft size={24} color={currentSlide === 0 ? "#9CA3AF" : "#8A4FFF"} />
        </TouchableOpacity>
        
        <View style={styles.progressIndicator}>
          {story.slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentSlide && styles.progressDotActive
              ]}
            />
          ))}
        </View>
        
        <TouchableOpacity 
          onPress={handleNext}
          style={[
            styles.navButton, 
            currentSlide === story.slides.length - 1 && styles.navButtonDisabled
          ]}
          disabled={currentSlide === story.slides.length - 1}
        >
          <ChevronRight 
            size={24} 
            color={currentSlide === story.slides.length - 1 ? "#9CA3AF" : "#8A4FFF"} 
          />
        </TouchableOpacity>
      </View>
      
      <AudioPlayer title={`${story.title} Narration`} duration={story.duration} />
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
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0E6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  progressIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#8A4FFF',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
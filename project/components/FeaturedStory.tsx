import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

interface StoryProps {
  story: {
    id: string;
    title: string;
    image: string;
    description: string;
  };
  onPress: () => void;
}

const FeaturedStory = ({ story, onPress }: StoryProps) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: story.image }} style={styles.image} />
      <View style={styles.overlay}>
        <Star size={24} color="#FFD166" style={styles.starIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{story.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {story.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    justifyContent: 'space-between',
  },
  starIcon: {
    alignSelf: 'flex-start',
  },
  textContainer: {
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});

export default FeaturedStory;
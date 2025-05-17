import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Book } from 'lucide-react-native';

interface ChapterProps {
  id: string;
  title: string;
  description: string;
  image: string;
  storyCount: number;
}

const ChapterItem = ({ id, title, description, image, storyCount }: ChapterProps) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push(`/chapter/${id}`)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.storyInfo}>
            <Book size={16} color="#87CEEB" />
            <Text style={styles.storyCount}>{storyCount} Stories</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginLeft: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  storyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyCount: {
    marginLeft: 6,
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
});

export default ChapterItem;
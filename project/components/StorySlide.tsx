import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

interface StorySlideProps {
  image: string;
  text: string;
  fadeAnim?: Animated.Value;
}

const StorySlide = ({ image, text, fadeAnim = new Animated.Value(1) }: StorySlideProps) => {
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default StorySlide;
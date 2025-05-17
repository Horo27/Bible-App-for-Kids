import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react-native';

interface AudioPlayerProps {
  title: string;
  duration: number; // in seconds
}

const AudioPlayer = ({ title, duration }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // This would be implemented with a real audio player library
  // For now, we'll just mock the interface
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    // API Integration Point:
    // Implement actual audio playback here using a library like expo-av
    // Example:
    // if (isPlaying) {
    //   await soundObject.pauseAsync();
    // } else {
    //   await soundObject.playAsync();
    // }
  };

  const skipForward = () => {
    // API Integration Point:
    // Implement skip forward logic
    // Example: 
    // await soundObject.setPositionAsync(currentPosition + 10000);
    setProgress(Math.min(1, progress + 0.1));
  };

  const skipBackward = () => {
    // API Integration Point:
    // Implement skip backward logic
    // Example:
    // await soundObject.setPositionAsync(currentPosition - 10000);
    setProgress(Math.max(0, progress - 0.1));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentTime = Math.floor(progress * duration);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity onPress={skipBackward} style={styles.controlButton}>
          <SkipBack size={24} color="#8A4FFF" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          {isPlaying ? (
            <Pause size={28} color="#FFFFFF" />
          ) : (
            <Play size={28} color="#FFFFFF" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={skipForward} style={styles.controlButton}>
          <SkipForward size={24} color="#8A4FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0E6FF',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#533299',
    marginBottom: 12,
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#D4C4F8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8A4FFF',
    borderRadius: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#533299',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: 12,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8A4FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
});

export default AudioPlayer;
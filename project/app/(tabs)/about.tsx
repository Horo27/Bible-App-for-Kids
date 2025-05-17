import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { Heart, Mail, ExternalLink } from 'lucide-react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About Bible Stories</Text>
        <Text style={styles.subtitle}>Interactive stories for children</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.paragraph}>
          We created Bible Stories to help children learn about the Bible through engaging,
          interactive storytelling. Our goal is to make these timeless stories accessible and
          enjoyable for children of all ages.
        </Text>
        
        <View style={styles.missionImageContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg' }} 
            style={styles.missionImage} 
          />
        </View>
        
        <Text style={styles.paragraph}>
          Each story has been carefully adapted for children with beautiful illustrations,
          age-appropriate text, and professional narration to create an immersive experience.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Heart size={24} color="#8A4FFF" />
          </View>
          <View>
            <Text style={styles.featureTitle}>Child-Friendly Content</Text>
            <Text style={styles.featureDescription}>
              All stories are adapted specifically for children, with age-appropriate language and themes.
            </Text>
          </View>
        </View>
        
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Heart size={24} color="#8A4FFF" />
          </View>
          <View>
            <Text style={styles.featureTitle}>Interactive Experience</Text>
            <Text style={styles.featureDescription}>
              Beautiful illustrations and professional narration bring each story to life.
            </Text>
          </View>
        </View>
        
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Heart size={24} color="#8A4FFF" />
          </View>
          <View>
            <Text style={styles.featureTitle}>Educational Content</Text>
            <Text style={styles.featureDescription}>
              Learn important values and lessons from timeless Bible stories.
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.paragraph}>
          We'd love to hear from you! If you have any questions, feedback, or suggestions,
          please don't hesitate to get in touch.
        </Text>
        
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => Linking.openURL('mailto:contact@biblestories.app')}
        >
          <Mail size={20} color="#FFFFFF" />
          <Text style={styles.contactButtonText}>Email Us</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.websiteButton}
          onPress={() => Linking.openURL('https://biblestories.app')}
        >
          <ExternalLink size={20} color="#8A4FFF" />
          <Text style={styles.websiteButtonText}>Visit Our Website</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.copyright}>© 2025 Bible Stories App</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#8A4FFF',
    padding: 24,
    paddingTop: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  section: {
    padding: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
    marginBottom: 16,
  },
  missionImageContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 16,
  },
  missionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0E6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
  },
  contactButton: {
    backgroundColor: '#8A4FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 16,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  websiteButton: {
    backgroundColor: '#F0E6FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  websiteButtonText: {
    color: '#8A4FFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  version: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
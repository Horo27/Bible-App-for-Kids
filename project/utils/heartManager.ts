import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, TextInput } from 'react-native';
const HEARTS_KEY = 'userCurrentHearts';
export const MAX_HEARTS = 5;
const BLOCK_TIMESTAMP_KEY = 'userBlockTimestamp';
const BLOCK_DURATION_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

export interface HeartStatus {
  hearts: number;
  isBlocked: boolean;
  blockLiftTime?: number; // Timestamp when the block will be lifted
  message?: string; // Optional message for UI
}

// Initialize hearts if they are not already set
export const initializeHearts = async (): Promise<void> => {
  try {
    const currentHeartsStr = await AsyncStorage.getItem(HEARTS_KEY);
    if (currentHeartsStr === null) {
      await AsyncStorage.setItem(HEARTS_KEY, MAX_HEARTS.toString());
    }
  } catch (e) {
    console.error("Failed to initialize hearts.", e);
  }
};

export const getHeartStatus = async (): Promise<HeartStatus> => {
  try {
    await initializeHearts(); // Ensure hearts are initialized on first check

    const heartsStr = await AsyncStorage.getItem(HEARTS_KEY);
    let hearts = heartsStr ? parseInt(heartsStr, 10) : MAX_HEARTS;

    const blockTimestampStr = await AsyncStorage.getItem(BLOCK_TIMESTAMP_KEY);
    if (blockTimestampStr) {
      const blockTimestamp = parseInt(blockTimestampStr, 10);
      const currentTime = Date.now();
      const liftTime = blockTimestamp + BLOCK_DURATION_MS;

      if (currentTime < liftTime) {
        const remainingTime = liftTime - currentTime;
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        return {
          hearts,
          isBlocked: true,
          blockLiftTime: liftTime,
          message: `Access blocked. Please wait ${hours}h ${minutes}m.`
        };
      } 
      else {
        // Block has expired
        await AsyncStorage.removeItem(BLOCK_TIMESTAMP_KEY);
        // If hearts were 0 due to block, reset them
        if (hearts === 0) {
            await AsyncStorage.setItem(HEARTS_KEY, MAX_HEARTS.toString());
            hearts = MAX_HEARTS;
        }
        return { hearts, isBlocked: false };
      }
    }
    return { hearts, isBlocked: false };
  } catch (e) {
    console.error("Failed to get heart status.", e);
    // Default to a non-blocked state with max hearts on error to prevent locking out user due to storage failure
    return { hearts: MAX_HEARTS, isBlocked: false, message: "Error fetching status." };
  }
};

export const decrementHeart = async (): Promise<HeartStatus> => {
  try {
    let status = await getHeartStatus(); // Get current status first
    if (status.isBlocked) return status; // Cannot decrement if already blocked

    let currentHearts = status.hearts;
    if (currentHearts > 0) {
      currentHearts--;
      await AsyncStorage.setItem(HEARTS_KEY, currentHearts.toString());
      if (currentHearts === 0) {
        const blockStartTime = Date.now();
        await AsyncStorage.setItem(BLOCK_TIMESTAMP_KEY, blockStartTime.toString());
        const liftTime = blockStartTime + BLOCK_DURATION_MS;
        const hours = Math.floor(BLOCK_DURATION_MS / (1000 * 60 * 60));
        const minutes = Math.floor((BLOCK_DURATION_MS % (1000 * 60 * 60)) / (1000 * 60));
        return {
            hearts: 0,
            isBlocked: true,
            blockLiftTime: liftTime,
            message: `No hearts left! Access blocked for ${hours}h ${minutes}m.`
        };
      }
      return { hearts: currentHearts, isBlocked: false };
    }
    return status; // Should not happen if hearts > 0 check is proper
  } catch (e) {
    console.error("Failed to decrement heart.", e);
    return { hearts: MAX_HEARTS, isBlocked: false, message: "Error updating hearts." };
  }
};

// For testing: Reset hearts and remove block
export const resetUserProgressForTesting = async (): Promise<void> => {
  await AsyncStorage.setItem(HEARTS_KEY, MAX_HEARTS.toString());
  await AsyncStorage.removeItem(BLOCK_TIMESTAMP_KEY);
  console.log("User hearts and block status have been reset for testing.");
};
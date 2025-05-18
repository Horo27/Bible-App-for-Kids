import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView, // Added ScrollView for quiz content
  Alert
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { Video, AVPlaybackStatus } from 'expo-av'; // Make sure AVPlaybackStatus is imported
import { fetchStoryById, markStoryAsViewed } from '@/utils/api';
import { getHeartStatus, HeartStatus, MAX_HEARTS, decrementHeart } from '@/utils/heartManager'; // Import

export default function StoryScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState(null);
  const [localvideo, setLocalVideo] = useState(null);

  // Heart State
  const [heartStatus, setHeartStatus] = useState<HeartStatus>({ hearts: MAX_HEARTS, isBlocked: false });

  // Quiz State
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const videoRef = useRef<Video>(null); // Ref for video playe
  
  useEffect(() => {
    const loadStory = async () => {
      setShowQuiz(false); // Reset quiz state on new story load
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setQuizScore(0);
      setQuizFinished(false);

      const currentHeartStatus = await getHeartStatus();
      setHeartStatus(currentHeartStatus);

      if (currentHeartStatus.isBlocked) {
        setLoading(false);
        Alert.alert(
          "Access Blocked",
          currentHeartStatus.message || "You have run out of hearts. Please wait.",
          [{ text: "OK", onPress: () => router.replace('/(tabs)/chapters') }]
        );
        return;
      }

      const storyData = await fetchStoryById(id as string);
      if (storyData) {
        setStory(storyData);
        // setLocalVideo(storyData.video); // Use story.video directly
        markStoryAsViewed(id as string);
      } else {
        Alert.alert("Error", "Story not found.", [{ text: "OK", onPress: () => router.back() }]);
      }
      setLoading(false);
    };
    loadStory();
  }, [id]);

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
const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (heartStatus.isBlocked) return;
    if (status.isLoaded && status.didJustFinish) {
      if (story?.quiz && story.quiz.length > 0) {
        setShowQuiz(true);
      } else {
        router.back();
      }
    }
  };

  const handleAnswerSelection = async (questionIndex: number, optionId: string) => {
    // Prevent re-answering or answering if blocked
    if (selectedAnswers[questionIndex] !== undefined || heartStatus.isBlocked) return;

    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionId }));

    const currentQuestion = story?.quiz?.[questionIndex];
    if (currentQuestion && optionId !== currentQuestion.correctAnswerId) {
      // Answer is incorrect, decrement heart
      const newStatus = await decrementHeart();
      setHeartStatus(newStatus);
      if (newStatus.isBlocked) {
        Alert.alert(
          "No Hearts Left!",
          newStatus.message || "Access to stories is now blocked.",
          [{ text: "OK", onPress: () => router.replace('/(tabs)/chapters') }]
        );
        // No need to proceed further with quiz UI updates if blocked
      }
    }
  };

  const submitQuiz = () => {
    if (heartStatus.isBlocked) return; // Don't submit if blocked
    let score = 0;
    story?.quiz?.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswerId) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizFinished(true);
  };

  const handleNextQuestion = () => {
    if (heartStatus.isBlocked) {
      Alert.alert("Access Blocked", heartStatus.message, [{ text: "OK", onPress: () => router.replace('/(tabs)/chapters') }]);
      return;
    }
    if (currentQuestionIndex < (story?.quiz?.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };
  
  const resetQuizAndVideo = async () => {
    const currentStatus = await getHeartStatus(); // Re-check status
    setHeartStatus(currentStatus);
    if (currentStatus.isBlocked) {
      Alert.alert("Access Blocked", currentStatus.message, [{ text: "OK", onPress: () => router.replace('/(tabs)/chapters') }]);
      return;
    }
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizScore(0);
    setQuizFinished(false);
    videoRef.current?.replayAsync();
  };

 if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        {/* Consistent loading header can be added if desired, or keep simple indicator */}
        <ActivityIndicator size="large" color="#8A4FFF" />
      </SafeAreaView>
    );
  }

  if (heartStatus.isBlocked && !loading) { // Ensure not to show this during initial load flicker
     return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Access Blocked</Text>
            {renderHeartsDisplay()}
          </View>
          <View style={styles.blockMessageContainer}>
            <Text style={styles.blockMessageText}>{heartStatus.message || "Your access is blocked."}</Text>
            <TouchableOpacity style={styles.quizButton} onPress={() => router.replace('/(tabs)/chapters')}>
              <Text style={styles.quizButtonText}>Go to Chapters</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
  }

  if (!story) { // Should be caught by loadScreenData's alert, but as a fallback
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Error</Text>
        </View>
        <View style={styles.blockMessageContainer}>
            <Text style={styles.blockMessageText}>Could not load story details.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // RENDER QUIZ VIEW
  if (showQuiz && story?.quiz) {
    if (quizFinished) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{story.title} - Quiz Results</Text>
            {renderHeartsDisplay()}
          </View>
          <View style={styles.quizContainer}>
            <Text style={styles.quizTitle}>Quiz Complete!</Text>
            <Text style={styles.quizScoreText}>Your Score: {quizScore} / {story.quiz.length}</Text>
            <TouchableOpacity style={styles.quizButton} onPress={resetQuizAndVideo} disabled={heartStatus.isBlocked}>
              <Text style={styles.quizButtonText}>Watch Again & Retake Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quizButton} onPress={() => router.replace('/(tabs)/chapters')}>
              <Text style={styles.quizButtonText}>Back to Stories</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }

    const currentQuestion = story.quiz[currentQuestionIndex];
    const hasAnsweredCurrentQuestion = selectedAnswers[currentQuestionIndex] !== undefined;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
           <TouchableOpacity onPress={() => router.back()} style={styles.backButton} disabled={heartStatus.isBlocked}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{story.title} - Quiz</Text>
          {renderHeartsDisplay()}
        </View>
        <ScrollView style={styles.quizContainer}>
          <Text style={styles.quizTitle}>Question {currentQuestionIndex + 1} of {story.quiz.length}</Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          {currentQuestion.options.map(option => {
            const isSelected = selectedAnswers[currentQuestionIndex] === option.id;
            const isCorrect = option.id === currentQuestion.correctAnswerId;
            
            let optionDynamicStyle = [styles.optionButton];

            if (hasAnsweredCurrentQuestion) {
              if (isCorrect) {
                optionDynamicStyle.push(styles.correctOption);
              } else if (isSelected && !isCorrect) {
                optionDynamicStyle.push(styles.incorrectOption);
              }
            }
            
            return (
              <TouchableOpacity
                key={option.id}
                style={optionDynamicStyle}
                onPress={() => {
                  if (!hasAnsweredCurrentQuestion) {
                    handleAnswerSelection(currentQuestionIndex, option.id);
                  }
                }}
                disabled={hasAnsweredCurrentQuestion || heartStatus.isBlocked}
              >
                <Text style={styles.optionText}>{option.id}. {option.text}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[styles.quizButton, (!hasAnsweredCurrentQuestion || heartStatus.isBlocked) && styles.disabledButton]}
            onPress={handleNextQuestion}
            disabled={!hasAnsweredCurrentQuestion || heartStatus.isBlocked}
          >
            <Text style={styles.quizButtonText}>
              {currentQuestionIndex === story.quiz.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Render video view
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} disabled={heartStatus.isBlocked}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{story.title}</Text>
        {renderHeartsDisplay()}
      </View>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef} // Assign ref
          source={story.video} // Use story.video from fetched data
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          ignoreSilentSwitch="ignore"
          shouldPlay
          useNativeControls
          style={styles.video}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#87CEEB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  heartsHeaderContainer: {
    flexDirection: 'row',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flexShrink: 1, // Allow title to shrink if hearts take space
    marginRight: 8, // Add some space before hearts
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 16, // Removed padding to allow video to be larger
    backgroundColor: '#FFFFFF', // Added black background for video area
  },
  video: {
    width: '102%', // Make video take full width of container
    aspectRatio: 1/1.04, // Maintain aspect ratio, adjust if your videos differ
    
    // height: 250, // Replaced by aspectRatio for responsiveness
    // backgroundColor: '#FFFFFF', // Moved to videoContainer
    // borderRadius: 12, // Optional: if you want rounded corners on video
  },
  quizContainer: {
    flex: 1,
    padding: 20,
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    borderColor: '#8A4FFF',
  },
  correctOption: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  incorrectOption: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  quizButton: {
    backgroundColor: '#87CEEB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  quizButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#B0E5F5', // Lighter color for disabled state
  },
  quizScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  blockMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#87CEEB',
  },
  blockMessageText: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  }
});
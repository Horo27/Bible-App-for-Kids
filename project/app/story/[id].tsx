import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView // Added ScrollView for quiz content
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Video, AVPlaybackStatus } from 'expo-av'; // Make sure AVPlaybackStatus is imported
import { fetchStoryById, markStoryAsViewed } from '@/utils/api';

export default function StoryScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  console.log('ID:', id);
  const [story, setStory] = useState(null);
  console.log("Story:", story)
  const [localvideo, setLocalVideo] = useState(null);

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
      // API integration point - fetch story details
      const storyData = await fetchStoryById(id);
      setLocalVideo(storyData['video']);
      if (storyData) {
        setStory(storyData);
        // API integration point - mark story as viewed
        markStoryAsViewed(id);
      }
      setLoading(false);
    };
    loadStory();
  }, [id]);

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      if (story?.quiz && story.quiz.length > 0) {
        setShowQuiz(true); // Show quiz when video finishes
      } else {
        // Optionally, navigate back or show a "Story Complete" message if no quiz
        router.back();
      }
    }
  };

  const submitQuiz = () => {
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
    if (currentQuestionIndex < (story?.quiz?.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question answered, now submit or show summary
      submitQuiz();
    }
  };
  
  const resetQuizAndVideo = () => {
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizScore(0);
    setQuizFinished(false);
    videoRef.current?.replayAsync(); // Replay video
  };

  const handleAnswerSelection = (questionIndex: number, optionId: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionId }));
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
        <ActivityIndicator size="large" color="#8A4FFF" />
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
          </View>
          <View style={styles.quizContainer}>
            <Text style={styles.quizTitle}>Quiz Complete!</Text>
            <Text style={styles.quizScoreText}>Your Score: {quizScore} / {story.quiz.length}</Text>
            <TouchableOpacity style={styles.quizButton} onPress={resetQuizAndVideo}>
              <Text style={styles.quizButtonText}>Watch Again & Retake Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quizButton} onPress={() => router.back()}>
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
           <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{story.title} - Quiz</Text>
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
              // Add a style for non-selected options when an answer has been made, if desired
              // e.g., if (!isSelected) optionDynamicStyle.push(styles.disabledOptionLook);
            }
            
            return (
              <TouchableOpacity
                key={option.id}
                style={optionDynamicStyle}
                onPress={() => {
                  if (!hasAnsweredCurrentQuestion) { // Only allow selection if not already answered
                    handleAnswerSelection(currentQuestionIndex, option.id);
                  }
                }}
                disabled={hasAnsweredCurrentQuestion} // Disable button after an answer is selected
              >
                <Text style={styles.optionText}>{option.id}. {option.text}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[styles.quizButton, !hasAnsweredCurrentQuestion && styles.disabledButton]}
            onPress={handleNextQuestion}
            disabled={!hasAnsweredCurrentQuestion}
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
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{"story.title"}</Text>
      </View>
      <View style={styles.videoContainer}>
        <Video
          source={localvideo}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          useNativeControls
          style={styles.video}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate} // Add status update handler
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
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 16, // Removed padding to allow video to be larger
    backgroundColor: '#000000', // Added black background for video area
  },
  video: {
    width: '100%', // Make video take full width of container
    aspectRatio: 16/9, // Maintain aspect ratio, adjust if your videos differ
    // height: 250, // Replaced by aspectRatio for responsiveness
    // backgroundColor: '#000', // Moved to videoContainer
    // borderRadius: 12, // Optional: if you want rounded corners on video
  },
  // Quiz Styles
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
  selectedOption: { // This style can indicate the currently tapped option before feedback
    borderColor: '#8A4FFF', // Purple border for selection
    // backgroundColor: '#E8DAFF', // Light purple background for selection
  },
  correctOption: {
    backgroundColor: '#D1FAE5', // Light green background
    borderColor: '#10B981',    // Green border
  },
  incorrectOption: {
    backgroundColor: '#FEE2E2', // Light red background
    borderColor: '#EF4444',    // Red border
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  quizButton: {
    backgroundColor: '#8A4FFF',
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
    backgroundColor: '#C9B6F4', // Lighter color for disabled state
  },
  quizScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});
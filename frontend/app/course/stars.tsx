import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../constants/Styles';

const { width } = Dimensions.get('window');

export default function StarsCourse() {
  const [showTest, setShowTest] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'Что такое звезда?',
      options: ['Планета', 'Раскаленный газовый шар', 'Спутник', 'Астероид'],
      correctAnswer: 1
    },
    {
      question: 'Какая звезда ближе всего к Земле?',
      options: ['Сириус', 'Полярная звезда', 'Солнце', 'Альфа Центавра'],
      correctAnswer: 2
    },
    {
      question: 'Как называется процесс образования звезд?',
      options: ['Эволюция', 'Звездообразование', 'Нуклеосинтез', 'Гравитационный коллапс'],
      correctAnswer: 1
    }
  ];

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setShowTest(false);
  };

  if (showTest) {
    if (showResults) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.container, styles.resultsContainer]}>
            <View style={styles.resultsContent}>
              <Text style={styles.resultsTitle}>Результаты теста</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>
                  Ваш результат:
                </Text>
                <Text style={styles.scoreNumber}>
                  {score} из {questions.length}
                </Text>
                <Text style={styles.scorePercentage}>
                  {Math.round((score / questions.length) * 100)}%
                </Text>
              </View>
              <TouchableOpacity style={styles.retryButton} onPress={resetTest}>
                <Text style={styles.retryButtonText}>Пройти тест снова</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.questionNumber}>
          Вопрос {currentQuestion + 1} из {questions.length}
        </Text>
        <Text style={globalStyles.question}>{questions[currentQuestion].question}</Text>
        <View style={globalStyles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={globalStyles.optionButton}
              onPress={() => handleAnswer(index)}
            >
              <Text style={globalStyles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Назад</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Звезды: Сияющие Гиганты Вселенной</Text>
          <Text style={styles.subtitle}>Изучение звездного мира</Text>
          <Text style={styles.paragraph}>
            Звезды - это гигантские раскаленные газовые шары, излучающие свет и тепло. Они являются
            основными строительными блоками галактик и играют ключевую роль в эволюции Вселенной.
          </Text>
          <Image 
            source={require('../../assets/images/4lesson.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={() => setShowTest(true)}
          >
            <Text style={styles.buttonText}>Перейти к тесту</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'ios' ? 8 : 0,
  },
  backButton: {
    paddingVertical: 4,
    width: 100,
    height: 36,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 17,
    color: '#2D6A4F',
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: (width - 32) * 0.5,
    borderRadius: 12,
    marginBottom: 20,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1A1A1A',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
    lineHeight: 24,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#4A4A4A',
  },
  button: {
    backgroundColor: '#2D6A4F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#2D6A4F',
    marginBottom: 8,
  },
  scorePercentage: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D6A4F',
  },
  retryButton: {
    backgroundColor: '#2D6A4F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 
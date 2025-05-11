import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../constants/Styles';

const { width } = Dimensions.get('window');

export default function PlanetsCourse() {
  const [showTest, setShowTest] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'Сколько планет в Солнечной системе?',
      options: ['7', '8', '9', '10'],
      correctAnswer: 1
    },
    {
      question: 'Какая планета самая большая в Солнечной системе?',
      options: ['Сатурн', 'Юпитер', 'Нептун', 'Уран'],
      correctAnswer: 1
    },
    {
      question: 'Какая планета известна как "Красная планета"?',
      options: ['Венера', 'Меркурий', 'Марс', 'Юпитер'],
      correctAnswer: 2
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
        <View style={globalStyles.container}>
          <Text style={globalStyles.title}>Результаты теста</Text>
          <Text style={globalStyles.score}>
            Ваш результат: {score} из {questions.length}
          </Text>
          <TouchableOpacity style={globalStyles.button} onPress={resetTest}>
            <Text style={globalStyles.buttonText}>Пройти тест снова</Text>
          </TouchableOpacity>
        </View>
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
          <Text style={styles.title}>Планеты: Миры на Орбитах Звезд</Text>
          <Text style={styles.subtitle}>Исследование планет Солнечной системы</Text>
          <Text style={styles.paragraph}>
            Планеты - это небесные тела, вращающиеся вокруг звезд. В нашей Солнечной системе
            восемь планет, каждая из которых уникальна своими характеристиками, атмосферой и
            условиями на поверхности.
          </Text>
          <Image 
            source={require('../../assets/images/5lesson.jpg')}
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
    width: width - 32,
    height: (width - 32) * 0.6,
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
}); 
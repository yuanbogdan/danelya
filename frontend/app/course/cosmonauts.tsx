import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../constants/Styles';

const { width } = Dimensions.get('window');

export default function CosmonautsCourse() {
    const [showTest, setShowTest] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            question: 'Кто совершил первый полет человека в космос?',
            options: ['Нил Армстронг', 'Юрий Гагарин', 'Алан Шепард', 'Валентина Терешкова'],
            correctAnswer: 1
        },
        {
            question: 'Что включает в себя подготовка космонавтов?',
            options: ['Только теоретические занятия', 'Физические тренировки и изучение космической техники', 'Исключительно психологическую подготовку', 'Изучение иностранных языков'],
            correctAnswer: 1
        },
        {
            question: 'Какие основные задачи выполняют космонавты во время космических полетов?',
            options: ['Только наблюдение за Землей', 'Научные эксперименты, ремонт оборудования, вывод спутников', 'Развлечение и отдых', 'Управление полетом с Земли'],
            correctAnswer: 1
        },
        {
            question: 'Какое качество особенно важно для работы космонавта?',
            options: ['Высокий рост', 'Абсолютная тишина, вывод спутников', 'Психологическая устойчивость', 'Отсутствие чувства юмора'],
            correctAnswer: 2
        },
        {
            question: 'Что осознают космонавты, видя Землю из космоса?',
            options: ['Ее безграничность и величие', 'Ее хрупкость и красоту', 'Ее незначительность во Вселенной', 'Отсутствие жизни на других планетах'],
            correctAnswer: 1
        },
        {
            question: 'Где работают современные космонавты, проводя длительные экспедиции?',
            options: ['На Луне', 'На Марсе', 'На космических кораблях многоразового использования', 'На Международной космической станции'],
            correctAnswer: 3
        },
        {
            question: 'Какое значение имеют достижения космонавтов для человечества?',
            options: ['Вдохновляют на познание и способствуют развитию науки и техники', 'Только историческое', 'Не имеют практического значения для повседневной жизни', 'Приводят к загрязнению космического пространства'],
            correctAnswer: 0
        },
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
                    <Text style={styles.title}>Космонавты: Первопроходцы Космической Эры</Text>
                    <Image
                        source={require('../../assets/images/3lesson.jpg')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <Text style={styles.subtitle}>История покорения космоса</Text>
                    <Text style={styles.paragraph}>
                        Космонавты – это люди, чья смелость и подготовка позволили человечеству выйти за пределы земной атмосферы и исследовать космическое пространство. История космонавтики началась с полета Юрия Гагарина, открывшего новую эру в истории человечества. Стать космонавтом – это результат многолетней rigorous подготовки, включающей физические тренировки, изучение космической техники, выживание в экстремальных условиях и психологическую устойчивость. Во время космических полетов космонавты проводят научные эксперименты, ремонтируют космические станции, выводят на орбиту спутники и исследуют другие планеты. Их работа сопряжена с огромным риском и требует высочайшего профессионализма и самоотдачи. Каждый полет – это не только личное достижение, но и вклад в развитие науки и техники. Космонавты становятся символами человеческого стремления к познанию и преодолению границ возможного. Они видят Землю из космоса, осознавая ее хрупкость и красоту, что часто меняет их мировоззрение. Их рассказы и фотографии вдохновляют миллионы людей по всему миру. Современные космонавты работают на Международной космической станции, проводя длительные экспедиции и готовясь к будущим полетам на Луну и Марс. Их опыт и знания бесценны для дальнейшего освоения космоса. Космонавты – это герои нашего времени, чьи подвиги навсегда вписаны в историю освоения космического пространства.
                    </Text>
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
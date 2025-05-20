import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../constants/Styles';

const { width } = Dimensions.get('window');

export default function SpaceIntroCourse() {
    const [showTest, setShowTest] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            question: 'Что является основной характеристикой космоса?',
            options: ['Полное отсутствие материи и энергии', 'Обширная арена с динамичными процессами', 'Статичное и неизменное пространство', 'Галактика Млечный Путь'],
            correctAnswer: 1
        },
        {
            question: 'Что помогает нам заглянуть в прошлое Вселенной при изучении космоса?',
            options: ['Магнитные поля планет', 'Атмосферные явления', 'Свет, идущий от далеких объектов', 'Гравитационные волны'],
            correctAnswer: 2
        },
        {
            question: 'Какие космические аппараты исследуют межпланетное пространство?',
            options: ['Орбитальные станции', 'Телескопы', 'Спутники связи', 'Автоматические межпланетные станции'],
            correctAnswer: 3
        },
        {
            question: 'Какие фундаментальные вопросы остаются открытыми при изучении космоса?',
            options: ['Состав атмосфер планет Солнечной системы', 'Наличие воды на Марсе', 'Природа темной материи и темной энергии', 'Скорость вращения Земли'],
            correctAnswer: 2
        },
        {
            question: 'Какую перспективу открывает освоение космоса для человечества?',
            options: ['Только научные исследования', 'Добыча ресурсов и колонизация других планет', 'Улучшение работы спутниковой связи', 'Развитие военной техники'],
            correctAnswer: 1
        },
        {
            question: 'Что является движущей силой в исследовании космоса?',
            options: ['Желание доказать превосходство одной страны над другой', 'Стремление к познанию неизведанного', 'Поиск новых рынков сбыта', 'Необходимость утилизации космического мусора'],
            correctAnswer: 1
        },
        {
            question: 'Какое ощущение часто возникает у космонавтов при взгляде на Землю из космоса?',
            options: ['Чувство превосходства над остальными людьми', 'Ощущение безграничной власти', 'Осознание хрупкости и красоты планеты', 'Разочарование в земной жизни'],
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
                    <Text style={styles.title}>Космос: Безграничная Пустота и Бесконечные Возможности</Text>
                    <Image
                        source={require('../../assets/images/1lesson.jpg')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <Text style={styles.subtitle}>Введение в космическое пространство</Text>
                    <Text style={styles.paragraph}>
                        Космос – это не просто пустота, а скорее обширная арена, где разворачиваются самые грандиозные процессы во Вселенной. От рождения звезд в гигантских молекулярных облаках до столкновения галактик, каждый уголок космоса наполнен динамикой и энергией. Мы, жители планеты Земля, являемся лишь крошечной частью этого величественного полотна. Изучение космоса позволяет нам заглянуть в прошлое Вселенной, понять ее настоящее и даже строить предположения о будущем. Телескопы, словно наши глаза, проникают сквозь миллиарды световых лет, собирая драгоценные данные о далеких галактиках, туманностях и экзопланетах. Космические аппараты бороздят межпланетное пространство, исследуя наших ближайших соседей и отправляя на Землю уникальные снимки и образцы. Космос манит своей загадочностью, ставя перед учеными все новые и новые вопросы о природе темной материи и темной энергии, о возможности существования внеземной жизни. Освоение космоса открывает перед человечеством невероятные перспективы – от добычи ресурсов на астероидах до колонизации других планет. Это вызов нашему интеллекту, нашей изобретательности и нашему стремлению к познанию неизведанного. Каждый полет в космос – это шаг вперед в понимании нашего места во Вселенной и расширение границ человеческих возможностей. Космос ждет своих исследователей, храня в себе еще бесчисленное количество тайн, которые нам предстоит разгадать.
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
        lineHeight: 28,
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
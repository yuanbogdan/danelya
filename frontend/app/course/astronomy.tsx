import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../constants/Styles';

const { width } = Dimensions.get('window');

export default function AstronomyCourse() {
    const [showTest, setShowTest] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const questions = [
        {
            question: 'Из чего исторически зародилась наука астрономия?',
            options: ['Из философии и метафизики', 'Из практической необходимости ориентирования и составления календарей', 'Из религиозных верований и предсказаний', ' Из алхимии и астрологии'],
            correctAnswer: 1
        },
        {
            question: 'Что изучает астрономия в современном понимании?',
            options: ['Только движение планет Солнечной системы', 'Физические процессы и строение небесных тел во Вселенной', 'Влияние звезд на судьбы людей', 'Создание искусственных спутников Земли'],
            correctAnswer: 1
        },
        {
            question: 'Какие основные инструменты используют астрономы для сбора данных из космоса?',
            options: ['Барометры и термометры', 'Магнитометры и акселерометры', 'Телескопы и спектрографы', 'Микроскопы и центрифуги'],
            correctAnswer: 2
        },
        {
            question: 'Что можно определить, анализируя спектры света звезд?',
            options: ['Только их яркость', 'Химический состав, температуру и скорость движения', 'Наличие планет на их орбитах', 'Их возраст'],
            correctAnswer: 1
        },
        {
            question: 'Какое важное открытие было сделано благодаря астрономическим наблюдениям?',
            options: ['Закон всемирного тяготения', 'Существование электромагнитных волн', 'Открытие экзопланет', 'Теория относительности'],
            correctAnswer: 2
        },
        {
            question: 'С какими науками тесно связана современная астрономия?',
            options: ['Только с математикой', 'С физикой, математикой и информатикой', 'С химией и биологией', 'С географией и геологией'],
            correctAnswer: 1
        },
        {
            question: 'Какое влияние оказывает астрономия на науку и технологии?',
            options: ['Замедляет их развитие из-за больших затрат', 'Не оказывает существенного влияния', 'Вдохновляет на новые открытия и разработки', 'Способствует только развитию космических полетов'],
            correctAnswer: 2
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
                    <Text style={styles.title}>Астрономия: Наука о Вселенной</Text>
                    <Image
                        source={require('../../assets/images/2lesson.jpg')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <Text style={styles.subtitle}>Основы астрономических исследований</Text>
                    <Text style={styles.paragraph}>
                    Астрономия – одна из старейших наук, зародившаяся из практической необходимости ориентирования по звездам и составления календарей. Сегодня астрономия превратилась в мощный инструмент для изучения физических процессов, происходящих в космосе. Она исследует происхождение, эволюцию и строение небесных тел – от планет и звезд до галактик и их скоплений. Астрономы используют как наземные, так и космические телескопы, спектрографы и другие сложные приборы для сбора и анализа электромагнитного излучения, приходящего из космоса. Анализируя спектры света звезд, ученые могут определить их химический состав, температуру и скорость движения. Изучение движения планет и других тел Солнечной системы позволяет понять законы гравитации и формирования планетных систем. Современная астрономия тесно связана с физикой, математикой и информатикой, образуя междисциплинарную область знаний. Благодаря астрономическим наблюдениям были открыты экзопланеты – планеты, вращающиеся вокруг других звезд, что подогревает интерес к поиску внеземной жизни. Астрономические данные также используются для проверки фундаментальных физических теорий, таких как общая теория относительности. Астрономия не только расширяет наше понимание Вселенной, но и вдохновляет на новые научные открытия и технологические разработки. Это наука, которая позволяет нам ощутить наше космическое родство и осознать величие мироздания.
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
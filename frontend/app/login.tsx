import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { validateEmail } from '../utils/validation';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { login } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка валидации',
        text2: 'Пожалуйста, проверьте введенные данные',
        position: 'bottom',
        visibilityTime: 4000,
      });
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      Toast.show({
        type: 'success',
        text1: 'Успешный вход',
        text2: 'Добро пожаловать!',
        position: 'bottom',
        visibilityTime: 3000,
      });
      setTimeout(() => {
        router.replace('/home');
      }, 1000);
    } catch (error: any) {
      let errorMessage = 'Произошла ошибка при входе';
      
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Неверный email или пароль';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Некорректный email';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Слишком много попыток входа. Попробуйте позже';
          break;
      }
      
      Toast.show({
        type: 'error',
        text1: 'Ошибка входа',
        text2: errorMessage,
        position: 'bottom',
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Вход</Text>
        <Text style={styles.subtitle}>Добро пожаловать в Plantland</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors({ ...errors, email: '' });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Пароль"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' });
          }}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Войти</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchButton}
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.switchButtonText}>
            Нет аккаунта? Зарегистрируйтесь
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D6A4F',
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flex: 1,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 5,
    fontSize: 16,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2D6A4F',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  switchButtonText: {
    color: '#2D6A4F',
    fontSize: 16,
  },
}); 
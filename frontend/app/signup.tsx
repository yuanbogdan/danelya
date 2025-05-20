import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword, validateName } from '../utils/validation';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { register } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!validateName(name)) {
      newErrors.name = 'Имя должно содержать от 2 до 50 символов';
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов, включая буквы и цифры';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
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
      await register(email, password, name);
      Toast.show({
        type: 'success',
        text1: 'Успешная регистрация',
        text2: 'Ваш аккаунт успешно создан!',
        position: 'bottom',
        visibilityTime: 3000,
      });
      setTimeout(() => {
        router.replace('/home');
      }, 1000);
    } catch (error: any) {
      let errorMessage = 'Произошла ошибка при регистрации';
      
      switch (error.message) {
        case 'auth/email-already-in-use':
          errorMessage = 'Этот email уже используется';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Некорректный email';
          break;
        case 'auth/weak-password':
          errorMessage = 'Пароль слишком слабый';
          break;
      }
      
      Toast.show({
        type: 'error',
        text1: 'Ошибка регистрации',
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
        <Text style={styles.title}>Регистрация</Text>
        <Text style={styles.subtitle}>Создайте аккаунт в Plantland</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Имя"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrors({ ...errors, name: '' });
          }}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

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

        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrors({ ...errors, confirmPassword: '' });
          }}
          secureTextEntry
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.switchButtonText}>
            Уже есть аккаунт? Войдите
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
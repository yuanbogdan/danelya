import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function RootLayout() {
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: '#2D6A4F',
          backgroundColor: '#ffffff',
          borderRadius: 10,
          marginBottom: 20,
          width: '90%',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#1A1A1A',
        }}
        text2Style={{
          fontSize: 14,
          color: '#4A4A4A',
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: '#FF3B30',
          backgroundColor: '#ffffff',
          borderRadius: 10,
          marginBottom: 20,
          width: '90%',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#1A1A1A',
        }}
        text2Style={{
          fontSize: 14,
          color: '#4A4A4A',
        }}
      />
    ),
  };
  
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="home" />
        <Stack.Screen name="course" />
      </Stack>
      <StatusBar style="dark" />
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

import { Stack } from 'expo-router';

export default function CourseLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="space" />
    </Stack>
  );
} 
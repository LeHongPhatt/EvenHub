// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setIntroSeen = async () => {
  await AsyncStorage.setItem('hasSeenIntro', 'true');
};

export const getIntroSeen = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem('hasSeenIntro');
  return value === 'true';
};

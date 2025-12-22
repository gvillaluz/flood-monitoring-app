import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import LigtasCheckLogo from '../components/LigtasCheckLogo';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkOnBoard = async () => {
      const hasSeenOnBoard = await AsyncStorage.getItem('hasSeenOnBoard')

      await new Promise(resolve => setTimeout(resolve, 1500))

      if (!hasSeenOnBoard || hasSeenOnBoard === 'false') {
        router.replace('/onboarding')
      } else {
        router.replace('/home');
      }
    }

    NavigationBar.setVisibilityAsync("hidden");
    //NavigationBar.setBehaviorAsync("overlay-swipe");

    checkOnBoard();
  }, []);

  return (
    <View
      className='flex-1 justify-center items-center'
    >
      <LigtasCheckLogo />
      <ActivityIndicator 
        size='large' 
        color='rgba(34, 90, 227, 1)'
        className='mt-8'
        style={{ transform: [{ scale: 2 }] }}
      />
    </View>
  )
}
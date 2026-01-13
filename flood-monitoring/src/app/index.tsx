import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import { SplashScreen, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import LigtasCheckLogo from '../components/LigtasCheckLogo';
import { getIsOnboarded } from '../utils/cache';

SplashScreen.preventAutoHideAsync()

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkOnBoard = async () => {
      const hasSeenOnBoard = await getIsOnboarded()

      if (!hasSeenOnBoard || hasSeenOnBoard === 'false') {
        router.replace('/onboarding')
      } else {
        router.replace('/home');
      }
    }

    NavigationBar.setVisibilityAsync("hidden");

    checkOnBoard();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#F5F5F5",
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image 
        source={require('../../assets/icons/splash-icon-light.png')}
        style={{
          resizeMode: "contain",
          width: 200
        }}
      />
    </View>
  )
}
import { Stack } from "expo-router";
import React from 'react';
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import '../../global.css';
import { NetworkProvider } from "../providers/NetworkProvider";

export default function RootLayout() {
  return (
    <NetworkProvider>
      <SafeAreaProvider>
        <StatusBar hidden={true} />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </NetworkProvider>
  );
}

import { Stack } from "expo-router";
import React from 'react';
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import '../../global.css';
import { NetworkProvider } from "../providers/NetworkProvider";
import { NotificationProvider } from "../providers/NotificationProvider";

export default function RootLayout() {
  return (
    <NetworkProvider>
      <NotificationProvider>
        <SafeAreaProvider>
          <StatusBar hidden={true} />
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
      </NotificationProvider>
    </NetworkProvider>
  );
}

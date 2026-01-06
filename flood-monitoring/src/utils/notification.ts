import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

export async function registerForPushNotifications() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
    }

    const token = (await Notifications.getDevicePushTokenAsync()).data
    console.log("FCM Token: " + token)
    return { token, finalStatus }
}
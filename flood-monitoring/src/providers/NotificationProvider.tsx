import React, { createContext, useEffect } from "react";
import { useNetwork } from "../hooks/useNetwork";
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { deletePendingToken, getPendingToken, getSyncedToken, savePendingToken, saveSyncedToken } from "../utils/tokens";
import { Platform } from "react-native";
import { syncWithBackend } from "../services/notificationService";

const NotificationContext = createContext(null)

export function NotificationProvider({ children }: {children: React.ReactNode} ) {
    const { isConnected } = useNetwork()

    const configureChannel = async () => {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('warning-alerts', {
                name: 'Emergency Flood Warnings',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 500, 200, 500],
                showBadge: true
            })

            await Notifications.setNotificationChannelAsync('critical-alerts', {
                name: 'Emergency Critical Flood Alerts',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 500, 200, 500],
                showBadge: true
            })
        }
    }

    const syncDeviceToken = async () => {
        if (!Device.isDevice) {
            console.log("You should use a physical device.")
            return
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus

        if (finalStatus !== "granted") {
            const { status: newStatus } = await Notifications.requestPermissionsAsync()
            finalStatus = newStatus
        }

        if (finalStatus !== "granted") {
            console.log("Notification permission denied.")
            return
        }

        const token = (await Notifications.getDevicePushTokenAsync()).data
        const syncedToken = await getSyncedToken()
        const pendingToken = await getPendingToken()

        if (token !== syncedToken || pendingToken) {
            if (isConnected) {
                try {
                    await syncWithBackend(token)
                    await saveSyncedToken(token)
                    await deletePendingToken()
                } catch {
                    await savePendingToken(token)
                }
            } else {
                await savePendingToken(token)
            }
        }
    }

    useEffect(() => {
        configureChannel()
    }, [])

    useEffect(() => {
        const syncToken = async () => {
            if (isConnected) {
                syncDeviceToken()
            }
        }

        syncToken()
    }, [isConnected])

    return <NotificationContext.Provider value={null}>
        { children }
    </NotificationContext.Provider>
}
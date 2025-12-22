import { Text, View } from "react-native";
import { useNetwork } from "../hooks/useNetwork";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";

export default function OfflineBanner() {
    // const isConnected = false
    const { isConnected } = useNetwork()
    const [showOnlineToast, setShowOnlineToast] = useState(false)
    const lastStatus = useRef(isConnected)

    useEffect(() => {
        if (lastStatus.current === false && isConnected) {
            setShowOnlineToast(true)
            const timer = setTimeout(() => setShowOnlineToast(false), 3000)
            return () => clearTimeout(timer)
        }

        lastStatus.current = isConnected
    }, [isConnected])

    if (isConnected && !showOnlineToast) return null

    return (
        <View
            style={{
                backgroundColor: isConnected ? "#22C55E" : "#5F6368",
                paddingVertical: 7,
                alignItems: "center",
                zIndex: 999
            }}
        >
            <SafeAreaView
                edges={['top']}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 14,
                        fontWeight: 500
                    }}
                >
                    {isConnected
                    ? "Back Online. Syncing latest levels..."
                    : "No Internet Connection"}
                </Text>
            </SafeAreaView>
        </View>
    )
}
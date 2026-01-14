import GradientHeader from "@/src/components/GradientHeader"
import { ActivityIndicator, RefreshControl, ScrollView, View, Text } from "react-native"
import PredictionAlert from "../../components/PredictionAlert"
import CurrentStatus from "./components/CurrentStatus/CurrentStatus"
import PredictionLevel from "./components/PredictionLevel"
import { useFlood } from "@/src/hooks/useFlood"
import { useEffect, useState } from "react"
import { SplashScreen } from "expo-router"


export default function HomeScreen() {
    const { floodRecords, onRefresh, refreshing, prediction } = useFlood()

    const firstPrediction = prediction?.[0];
    const showAlert = (firstPrediction?.predictionWater1h ?? 0) >= 15.0;

    const isLoading = !floodRecords || floodRecords.length === 0

    const isRising = firstPrediction?.isRising

    useEffect(() => {
        SplashScreen.hideAsync()
    }, [])

    return (
        <ScrollView
            className="bg-pink_white"
            refreshControl={
                <RefreshControl 
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#009964']}
                    tintColor={'#009964'}
                />
            }
        >
            <GradientHeader colors={['rgba(43, 106, 237, 1)', 'rgba(39, 198, 239, 1)']} />

            {isLoading
            ? <View
                className="min-h-80 max-h-[600px] h-[500px] justify-center"
            >
                <ActivityIndicator size={70} color={"blue"} />
            </View>
            : <View
                className="px-7 mt-[-60px] gap-5 pb-7"
            >
                {showAlert && <PredictionAlert />}
                <CurrentStatus />
                <PredictionLevel meter={floodRecords[0].predictedWaterLevel ?? 0.0} meterChange={floodRecords[0].waterLevelChange ?? 0.0} isRising={isRising ?? false} />
                
                <View
                    className="flex-1 mt-[30px]"
                >
                    <Text
                        className="text-center text-gray-400"
                    >
                        Data Source: PAGASA - Philippine Atmospheric, Geophysical and Astronomical Services Administration
                    </Text>
                </View>
            </View>}
        </ScrollView>
    )
}
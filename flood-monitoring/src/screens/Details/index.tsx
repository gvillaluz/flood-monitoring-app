import GradientHeader from "@/src/components/GradientHeader"
import { RefreshControl, ScrollView, View } from "react-native"
import DetailedReadings from "./components/DetailedReadings"
import Level from "./components/Level"
import { useFlood } from "@/src/hooks/useFlood"

export default function DetailScreen() {
    const { waterLevels, refreshing, onRefresh } = useFlood()

    const peakLevel = waterLevels.reduce((prev, curr) => (curr.waterLevel > prev.waterLevel ? curr : prev), waterLevels[0])
    const lowestLevel = waterLevels.reduce((prev, curr) => (curr.waterLevel < prev.waterLevel ? curr : prev), waterLevels[0])

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
            <GradientHeader 
                colors={['rgba(241, 83, 0, 1)', 'rgba(237, 201, 141, 1)']}
            />

            <View
                className="px-7 mt-[-60px] gap-5 pb-7"
            >
                <DetailedReadings readings={waterLevels} />
                
                <View
                    className="flex-row justify-between items-center gap-2"
                >
                    <Level isPeak={true} values={peakLevel} />
                    <Level isPeak={false} values={lowestLevel} />
                </View>
            </View>
        </ScrollView>
    )
}
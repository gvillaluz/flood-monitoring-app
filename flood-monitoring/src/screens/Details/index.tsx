import GradientHeader from "@/src/components/GradientHeader"
import { RefreshControl, ScrollView, View, Text } from "react-native"
import DetailedReadings from "./components/DetailedReadings"
import Level from "./components/Level"
import { useFlood } from "@/src/hooks/useFlood"

export default function DetailScreen() {
    const { floodRecords, refreshing, onRefresh } = useFlood()

    const peakLevel = floodRecords.reduce((prev, curr) => (curr.waterLevel > prev.waterLevel ? curr : prev), floodRecords[0])
    const lowestLevel = floodRecords.reduce((prev, curr) => (curr.waterLevel < prev.waterLevel ? curr : prev), floodRecords[0])

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
                <DetailedReadings readings={floodRecords} />
                
                <View
                    className="flex-row justify-between items-center gap-2"
                >
                    <Level isPeak={true} values={peakLevel} />
                    <Level isPeak={false} values={lowestLevel} />
                </View>
                <View
                    className="flex-1 mt-[30px]"
                >
                    <Text
                        className="text-center text-gray-400"
                    >
                        Data Source: PAGASA - Philippine Atmospheric, Geophysical and Astronomical Services Administration
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}
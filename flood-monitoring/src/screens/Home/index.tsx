import GradientHeader from "@/src/components/GradientHeader"
import { ActivityIndicator, RefreshControl, ScrollView, View } from "react-native"
import PredictionAlert from "../../components/PredictionAlert"
import CurrentStatus from "./components/CurrentStatus/CurrentStatus"
import PredictionLevel from "./components/PredictionLevel"
import { useFlood } from "@/src/hooks/useFlood"

export default function HomeScreen() {
    const { waterLevels, onRefresh, refreshing } = useFlood()

    const isLoading = !waterLevels || waterLevels.length === 0

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
                <PredictionAlert />
                <CurrentStatus />
                <PredictionLevel meter={16.5} />
            </View>}
        </ScrollView>
    )
}
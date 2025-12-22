import GradientHeader from "@/src/components/GradientHeader"
import { ScrollView, View } from "react-native"
import PredictionAlert from "../../components/PredictionAlert"
import CurrentStatus from "./components/CurrentStatus/CurrentStatus"
import PredictionLevel from "./components/PredictionLevel"

export default function HomeScreen() {
    return (
        <ScrollView
            className="bg-pink_white"
        >
            <GradientHeader colors={['rgba(43, 106, 237, 1)', 'rgba(39, 198, 239, 1)']} />

            <View
                className="px-7 mt-[-60px] gap-5 pb-7"
            >
                <PredictionAlert />
                <CurrentStatus />
                <PredictionLevel meter={16.5} />
            </View>
        </ScrollView>
    )
}
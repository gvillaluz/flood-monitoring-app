import GradientHeader from '@/src/components/GradientHeader'
import PredictionAlert from '@/src/components/PredictionAlert'
import { ScrollView, View } from 'react-native'
import HourlyPrediction from './HourlyPrediction'

export default function AIScreen() {
    return (
        <ScrollView
            className='bg-pink_white'
        >
            <GradientHeader 
                colors={['rgba(157, 27, 241, 1)', 'rgba(228, 0, 121, 1)']}
            />

            <View
                className="px-7 mt-[-60px] gap-5 pb-7"
            >
                <PredictionAlert />
                <HourlyPrediction />
            </View>
        </ScrollView>
    )
}
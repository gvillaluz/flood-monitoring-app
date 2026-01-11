import GradientHeader from '@/src/components/GradientHeader'
import PredictionAlert from '@/src/components/PredictionAlert'
import { RefreshControl, ScrollView, View } from 'react-native'
import HourlyPrediction from './HourlyPrediction'
import { useFlood } from '@/src/hooks/useFlood'

export default function AIScreen() {
    const { onRefresh, refreshing } = useFlood()

    return (
        <ScrollView
            className='bg-pink_white'
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
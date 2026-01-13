import { useFlood } from '@/src/hooks/useFlood'
import { Text, View } from 'react-native'
import DetailedPredictions from './components/DetailedPredictions'

export default function HourlyPrediction() {
    const { prediction } = useFlood()

    return (
        <View
            className="bg-primary_white rounded-2xl overflow-hidden p-6 gap-2"
            style={{
                borderWidth: 1,
                borderColor: 'rgba(18, 18, 18, 0.1)',
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 17.6,
                elevation: 6
            }}
        >
            <Text
                className="font-roboto font-bold text-normal text-secondary_black"
                style={{
                    lineHeight: 24
                }}
            >
                Hourly Prediction
            </Text>
            <View
                className="gap-2"
            >
                {(prediction?.length ?? 0) <= 0 ? (
                    <Text
                        className="text-normal font-roboto text-primary-black"
                    >
                        System is gathering data for initial prediction.
                    </Text>
                ) : (
                    <DetailedPredictions readings={prediction ?? []} />
                )}
            </View>
        </View>
    )
}
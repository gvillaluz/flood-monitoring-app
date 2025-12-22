import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

export default function PredictionAlert() {
    return (
        <View
            className="p-2 py-5 flex-row gap-3 rounded-2xl w-[100%]"
            style={{
                backgroundColor: 'rgba(255, 237, 219, 1)',
                borderWidth: 0.5,
                borderColor: 'rgba(200, 50, 30, 1)'
            }}
        >
            <View className='w-fit'>
                <Ionicons name="warning" color='rgba(245, 158, 11, 1)' size={25} />
            </View>
            <View
                className="gap-1 flex-1"
            >
                <Text
                    className="font-bold font-roboto text-normal"
                >
                    AI Prediction Alert
                </Text>
                <Text
                    className="font-roboto text-[15px]"
                >
                   Water level will reach evacuation threshold by the next 2 hours. Consider evacuating.
                </Text>
            </View>
        </View>
    )
}
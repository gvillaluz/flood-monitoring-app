import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { useFlood } from '../hooks/useFlood'

export default function PredictionAlert() {
    const { prediction, status } = useFlood()

    const getMessage = () => {
        if (!prediction || !status) return

        const meter = 17

        if (meter >= 17.0) 
            return `Water level is predicted to surge to ${meter}m soon. Immediate evacuation will be required. Move to safe ground immediately.`
        else if (meter >= 16.0)
            return `Water level is predicted to rise to ${meter}m by the next hour. Residents in low-lying areas should consider evacuating now.`
        else if (meter >= 15.0)
            return `Water level is predicted to reach the ${meter}m threshold within the next hour. Residents should prepare survival kits and monitor updates.`
    }

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
                   {getMessage()}
                </Text>
            </View>
        </View>
    )
}
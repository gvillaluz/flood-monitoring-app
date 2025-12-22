import { Text, View } from 'react-native'
import ListDetail from './ListDetail'
import { WaterLevel } from '@/src/types/Flood'

type ObjectProps = {
    readings: WaterLevel[]
}

export default function DetailedReadings({ readings }: ObjectProps) {
    return (
        <View
            className="bg-white rounded-2xl overflow-hidden p-6 gap-2"
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
                Detailed Readings
            </Text>
            
            <ListDetail readings={readings} />
        </View>
    )
}
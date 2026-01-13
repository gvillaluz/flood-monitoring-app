import { FloodRecord, Prediction } from "@/src/types/Flood"
import { formatTimeMinsHours } from "@/src/utils/time_utils"
import { Image, Text, View } from "react-native"

type ObjectProps = {
    readings: Prediction[]
}

export default function DetailedPredictions({ readings }: ObjectProps) {
    return (
        <View
            className="gap-2"
        >
            {readings.map((detail, i) => (
                <View
                    key={i}
                    className="flex-row justify-between items-center py-2 px-4 rounded-sm"
                    style={{
                        backgroundColor: i === 0 ? 'rgba(254, 243, 199, 1)' : 'rgba(249, 250, 251, 1)',
                        borderColor: i === 0 ? 'rgba(251, 223, 110, 1)' : '',
                        borderWidth: i === 0 ? 1 : 0
                    }}
                >
                    <View
                        className="flex-row justify-between gap-4"
                    >
                        <Text
                            className="font-roboto text-normal text-tertiary_black"
                        >
                            {formatTimeMinsHours(detail.timestamp)}
                        </Text>
                        <Text
                            className="font-roboto text-normal text-primary_black"
                        >
                            {detail.predictionWater1h}m
                        </Text>
                    </View>
                    <Image 
                        source={detail.isRising 
                            ? require('../../../../assets/images/level-2.png')
                            : require('../../../../assets/images/level-down.png')
                        }
                        style={{
                            height: 25,
                            width: 25
                        }}
                        resizeMode="contain"
                    />
                </View>
            ))}
        </View>
    )
}
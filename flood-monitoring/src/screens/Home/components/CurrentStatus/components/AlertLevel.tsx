import { WaterLevel } from "@/src/types/Flood"
import { Image, Text, View } from "react-native"

type Props = {
    bgColor: string | undefined,
    currentWL: WaterLevel | null
}

export default function AlertLevel({ bgColor, currentWL }: Props) {
    if (!currentWL) {
        return null
    }

    return (
        <View
            className="flex-row items-center justify-between rounded-2xl p-4"
            style={{
                backgroundColor: bgColor,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.25,
                shadowRadius: 4
            }}
        >
            <View
                className="py-1"
            >
                <Text
                    className="font-roboto font-bold text-normal"
                    style={{
                        color: 'rgba(120, 53, 15, 1)',
                        lineHeight: 24
                    }}
                >
                    ALERT LEVEL
                </Text>
                <Text
                    className="font-bold font-roboto text-[45px] text-primary_white"
                >
                    {currentWL.waterLevel}m
                </Text>
                <Text
                    className="font-roboto text-normal text-secondary_white"
                >
                    Current Water Level
                </Text>
            </View>
            <View
                className="justify-center pr-4"
            >
                <Image 
                    source={currentWL.isRising 
                        ? require('../../../../../../assets/images/level-2.png')
                        : require('../../../../../../assets/images/level-down.png')
                    }
                    style={{
                        height: 70,
                        width: 70
                    }}
                    resizeMode="contain"
                />
            </View>
        </View>
    )
}
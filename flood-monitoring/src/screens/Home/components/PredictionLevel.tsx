import { Image, Text, View } from "react-native";

type Props = {
    meter: number
}

export default function PredictionLevel({ meter }: Props) {
    return (
        <View
            className="bg-secondary_white rounded-2xl overflow-hidden p-6 gap-2"
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
                AI Prediction
            </Text>
            <View
                className="flex-row items-center justify-between rounded-2xl p-4"
                style={{
                    backgroundColor: 'rgba(43, 106, 237, 0.81)',
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
                        className="font-roboto text-normal text-secondary_white"
                        style={{
                            lineHeight: 24
                        }}
                    >
                        Next 2 hours
                    </Text>
                    <Text
                        className="font-bold font-roboto text-[45px] text-primary_white"
                    >
                        {meter}m
                    </Text>
                    <Text
                        className="font-roboto text-normal text-critical_red"
                    >
                        + 1.0m increase
                    </Text>
                </View>
                <View
                    className="justify-center pr-4"
                >
                    <Image 
                        source={require('../../../../assets/images/level-2.png')}
                        style={{
                            height: 70,
                            width: 70
                        }}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </View>
    )
}
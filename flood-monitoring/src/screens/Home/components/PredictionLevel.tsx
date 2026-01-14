import { Image, Text, View } from "react-native";

type Props = {
    meter: number,
    meterChange: number,
    isRising: boolean
}

export default function PredictionLevel({ meter, meterChange, isRising }: Props) {
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
                        Next hour
                    </Text>
                    <Text
                        className="font-bold font-roboto text-primary_white"
                        style={{
                            fontSize: meter > 0.0 ? 45 : 30
                        }}
                    >
                        {meter > 0.0 ? meter.toFixed(2) + "m" : "Calibrating..."}
                    </Text>
                    <Text
                        className="font-roboto text-normal"
                        style={{
                            color: isRising ? 'rgba(200, 50, 30, 1)' : '#39E3A8'
                        }}
                    >
                        {isRising? `+ increase` : `— decrease`}
                    </Text>
                </View>
                <View
                    className="justify-center pr-4"
                >
                    <Image 
                        source={isRising
                            ? require('../../../../assets/images/level-2.png')
                            : require('../../../../assets/images/decreasing arrow.png')
                        }
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
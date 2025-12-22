import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { Text, View, LayoutAnimation, Platform, UIManager } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNetwork } from "../hooks/useNetwork"

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
    colors: [string, string]
}

export default function GradientHeader({ colors }: Props) {
    const { isConnected } = useNetwork()
    const [online, setOnline] = useState(isConnected)
    const [time, setTime] = useState('');

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (isConnected) {
            const timer = setTimeout(() => setOnline(true), 3000)

            return () => clearTimeout(timer)
        } else {
            setOnline(false)
        }
    }, [isConnected])

    const getTime = () => {
        const now = new Date();

        let hours = now.getHours();
        const mins = now.getMinutes();

        const apm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;

        const minsStr = mins < 10 ? '0' + mins : mins;

        setTime(`${hours}:${minsStr} ${apm}`);
    }

    useEffect(() => {
        getTime();

        const interval = setInterval(getTime, 60000)

        return () => clearInterval(interval)
    }, []);

    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="justify-start h-60"
            style={{
                borderBottomRightRadius: 25,
                borderBottomLeftRadius: 25
            }}
        >
            <SafeAreaView
                className="flex-row justify-between p-6"
                edges={online ? ['top', 'bottom', 'left', 'right'] : ['bottom', 'left', 'right']}
            >
                <View
                    className="gap-1"
                >
                    <Text
                        className="font-bold text-brighter_white text-[24px] font-roboto"
                    >
                        LigtasCheck AI
                    </Text>
                    <Text
                        className="font-roboto text-normal text-secondary_white"
                    >
                        Real-time Flood Monitoring
                    </Text>
                </View>
                <View
                    className="gap-1"
                >
                    <Text
                        className="text-secondary_white text-normal font-roboto"
                    >
                        Current Time
                    </Text>
                    <Text 
                        className="text-primary_white text-normal font-roboto text-right"
                    >
                        {time}
                    </Text>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}
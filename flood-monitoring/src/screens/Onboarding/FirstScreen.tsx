import LigtasCheckLogo from '@/src/components/LigtasCheckLogo';
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

type Props = {
    width: number;
}

export default function FirstScreen({ width }: Props) {
    useEffect(() => {
        SplashScreen.hideAsync()
    }, [])

    return (
        <LinearGradient
            colors={['rgba(43, 106, 237, 1)', 'rgba(39, 198, 239, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className='flex-1 justify-center items-center'
            style={{ width: width }}
        >
            <View
                className='items-center justify-center'
            >
                <LigtasCheckLogo />
                <Text
                    className='text-[40px] font-konkhmer font-bold text-primary_white'
                >
                    LigtasCheck AI
                </Text>
                <Text
                    className='text-[20px] text-primary_white font-roboto'
                >
                    Intelligent Flood Monitoring Assistant
                </Text>
            </View>
        </LinearGradient>
    )
}
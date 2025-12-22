import CircleLogo from '@/src/components/CircleLogo';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TileList from './components/TileList';

type Props = {
    width: number
}

export default function SecondScreen({ width }: Props) {
    const values = [
        {
            image: require('../../../assets/images/location-logo.png'),
            color: 'rgba(59, 130, 246, 1)',
            bgColor: 'rgba(239, 246, 255, 1)',
            title: 'Know Your Risk',
            text: 'Instantly see if you are in a high-risk flood zone'
        },
        {
            image: require('../../../assets/images/clock-logo.png'),
            color: 'rgba(245, 158, 11, 1)',
            bgColor: 'rgba(255, 251, 235, 1)',
            title: 'Real-Time Updates',
            text: 'Live data from PAGASA gauge stations.'
        },
        {
            image: require('../../../assets/images/chart-logo.png'),
            color: 'rgba(34, 197, 94, 1)',
            bgColor: 'rgba(240, 253, 244, 1)',
            title: 'Future Forecasts',
            text: 'AI predicts water levels in advance.'
        }
    ]

    return (
        <SafeAreaView
            className='flex-1 justify-start items-center bg-primary_white py-5 gap-10'
            style={{
                width: width,
            }}
        >
          <View
            className='justify-center items-center mb-[30px]'
          >
            <CircleLogo />
            <Text
                className='font-roboto text-primary_black text-2xl font-bold mb-4'
            >
                AI-Powered Prediction
            </Text>
            <Text
                className='text-center text-[17px] font-roboto leading-6 px-[40px]'
            >
                LigtasCheck AI doesn't just show you {'\n'} current water levels. Our advanced AI {'\n'} predicts future flooding, making you {'\n'} informed, and giving you time to {'\n'} evacuate safely.
            </Text>
          </View>
          
          <TileList values={values} />
        </SafeAreaView>
    )
}
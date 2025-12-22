import ShieldLogo from '@/src/components/ShieldLogo';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StartBtn from './components/StartBtn';
import StepList from './components/StepList';

type Props = {
    width: number
}

export default function ThirdScreen({ width }: Props) {
    const values = [
        {
            step: 1,
            text: 'Check your flood risk zone'
        },
        {
            step: 2,
            text: 'Monitor real-time water levels'
        },
        {
            step: 3,
            text: 'Get AI predictions'
        },
        {
            step: 4,
            text: 'Evacuate safely with extra time'
        }
    ]

    return (
        <SafeAreaView
            className='flex-1 justify-start items-center bg-dark_blue p-7 py-5 gap-9'
            style={{
                width: width
            }}
        >
            <View
                className='justify-center items-center'
            >
                <ShieldLogo />
                <Text
                    className='font-roboto font-bold text text-[24px] text-primary_white mb-4'
                >
                    Become Proactive
                </Text>
                <Text
                    className='text-center text-secondary_white text-normal font-roboto leading-7'
                >
                    Most apps tell you when it’s already {'\n'} flooding. LigtasCheck AI tells you before {'\n'} it happens, so you can act early and stay {'\n'} safe.
                </Text>
            </View>

            <StepList values={values} />

            <StartBtn />
        </SafeAreaView>
    )
}
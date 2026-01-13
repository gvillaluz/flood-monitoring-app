import { Image, Text, View } from 'react-native'
import ArrowDown from '../../../../assets/images/lowest-level.png'
import ArrowUp from '../../../../assets/images/peak-level.png'
import { FloodRecord } from '@/src/types/Flood'
import { formatTimeMinsHours } from '@/src/utils/time_utils'

type ObjectProps = {
    isPeak: boolean,
    values: FloodRecord
}

export default function Level({ isPeak, values }: ObjectProps) {
    return (
        <View
            className='bg-white rounded-2xl px-5 py-3 w-[164px] h-[106px] flex-1'
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
            <View
                className='flex-row items-center gap-2'
            >
                <Image 
                    source={isPeak ? ArrowUp : ArrowDown}
                />
                <Text
                    className='font-roboto text-normal text-tertiary_black'
                >
                    {isPeak ? "Peak" : "Lowest"} Level
                </Text>
            </View>
            <Text
                className='font-roboto font-bold text-[34px] text-primary_black'
            >
                {values.waterLevel}m
            </Text>
            <Text
                className='font-roboto text-normal text-tertiary_black'
            >  
                {formatTimeMinsHours(values.timestamp)}
            </Text>
        </View>
    )
}
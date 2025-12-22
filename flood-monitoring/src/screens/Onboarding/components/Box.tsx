import { Image, View } from 'react-native'

type Props = {
    image: any
    color: string
}

export default function Box({ image, color }: Props) {
    return (
        <View
            className='h-[65px] w-[65px] justify-center items-center rounded-xl'
            style={{ backgroundColor: color }}
        >
            <Image source={image} />
        </View>
    )
}
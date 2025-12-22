import { Text, View } from "react-native"
import Box from "./Box"

type Props = {
    image: any,
    color: string,
    bgColor: string,
    title: string,
    text: string
}

type ObjectProp = {
    value: Props
}

export default function Tile({ value }: ObjectProp) {
    return (
        <View
            className="flex-row gap-[15px] w-full p-[15px] rounded-3xl h-28 items-center"
            style={{
                backgroundColor: value.bgColor
            }}
        >
            <Box image={value.image} color={value.color} />
            <View
                className="w-full"
            >
                <Text
                    className="font-bold text-[16px]"
                >
                    {value.title}
                </Text>
                <Text
                    className="text-[16px] text-secondary_black"
                >
                    {value.text}
                </Text>
            </View>
        </View>
    )
}
import { Text, View } from "react-native";

type Props = {
    step: number,
    text: string
}

type ObjectProp = {
    value: Props
}

export default function Step({ value }: ObjectProp) {
    return (
        <View
            className="flex-row gap-5 p-1 items-center"
        >
            <View
                className="bg-blur_white h-[51px] w-[51px] rounded-full items-center justify-center elevetion-4"
                style={{
                    shadowColor: '#000',
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 }
                }}
            >
                <Text
                    className="text-primary_white font-black font-roboto text-[24px]"
                >
                    {value.step}
                </Text>
            </View>
            <Text
                className="font-bold font-roboto text-normal text-primary_white"
            >
                {value.text}
            </Text>
        </View>
    )
}
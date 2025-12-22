import { View } from "react-native";
import Tile from "./Tile";

type Props = {
    image: any,
    color: string,
    bgColor: string,
    title: string,
    text: string
}

type ObjectProp = {
    values: Props[]
}

export default function TileList({ values }: ObjectProp) {
    return (
        <View
            className="px-[60px] py-[20px] h-auto justify-around gap-[25px]"
        >
            {values.map((val, i) => (
                <Tile key={i} value={val} />
            ))}
        </View>
    )
}
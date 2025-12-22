import { View } from "react-native";
import Step from "./Step";

type Props = {
    step: number,
    text: string
}

type ObjectProp = {
    values: Props[]
}

export default function StepList({ values }: ObjectProp ) {
    return (
        <View
            className="px-6 py-7 bg-blur_blue rounded-3xl gap-4 elevetion-4"
            style={{
                shadowColor: '#000',
                shadowOpacity: 0.15,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 }
            }}
        >
            {values.map((val, i) => (
                <Step key={i} value={val} />
            ))}
        </View>
    )
}
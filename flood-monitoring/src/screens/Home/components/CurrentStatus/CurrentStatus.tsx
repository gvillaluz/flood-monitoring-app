import { Text, View } from "react-native";
import AlertLevel from "./components/AlertLevel";
import { useFlood } from "@/src/hooks/useFlood";

export default function CurrentStatus() {
    const { waterLevels } = useFlood()

    const currentWaterLevel = waterLevels.length > 0 ? waterLevels[0] : null

    const getBgColor = () => {
        if (!currentWaterLevel?.waterLevel) return "rgba(156, 163, 175, 1)"

        if (currentWaterLevel.waterLevel > 16)
            return "rgba(248, 113, 113, 1)"
        else if (currentWaterLevel.waterLevel > 15)
            return "rgba(251, 146, 60, 1)"
        else 
            return "rgba(250, 204, 21, 1)"
    }

    const bgColor = getBgColor()

    return (
        <View
            className="bg-secondary_white rounded-2xl overflow-hidden p-6 gap-2"
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
            <Text
                className="font-roboto font-bold text-normal text-secondary_black"
                style={{
                    lineHeight: 24
                }}
            >
                Current Status
            </Text>

            <AlertLevel bgColor={bgColor} currentWL={currentWaterLevel} />

            <View
                className="flex-row justify-between flex-1"
            >
                <View
                    className="bg-primary_white h-[77px] w-[145px] rounded-2xl p-2"
                >
                    <Text
                        className="font-roboto text-normal text-secondary_black"
                    >
                        Normal
                    </Text>
                    <Text
                        className="font-bold font-roboto text-primary_black text-[34px]"
                    >
                        12m
                    </Text>
                </View>
                <View
                    className="h-[77px] w-[145px] rounded-2xl p-2"
                    style={{
                        backgroundColor: 'rgba(254, 242, 242, 1)'
                    }}
                >
                    <Text
                        className="font-roboto text-normal text-critical_red_v2"
                    >
                        Critical
                    </Text>
                    <Text
                        className="font-roboto font-bold text-[34px] text-critical_red"
                    >
                        18m
                    </Text>
                </View>
            </View>
        </View>
    )
}
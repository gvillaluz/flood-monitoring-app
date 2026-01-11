import { setIsOnboarded } from "@/src/utils/cache";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function StartBtn() {
    const router = useRouter();

    const getStarted = async () => {
        await setIsOnboarded(true)
        router.replace('/home')
    }
    
    return (
        <TouchableOpacity
            className="bg-primary_white rounded-2xl w-full p-5"
            onPress={getStarted}
        >
            <Text
                className="text-center font-roboto text-normal font-bold text-primary_blue"
            >
                Get Started
            </Text>
        </TouchableOpacity>
    )
}
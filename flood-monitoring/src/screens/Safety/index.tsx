import GradientHeader from "@/src/components/GradientHeader";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import Contacts from "./components/Contacts";
import SafeZones from "./components/SafeZones";
import { useEffect, useState } from "react";
import { getCurrentLocation } from "@/src/utils/location";
import { Evacuation, Hotlines } from "@/src/types/Evacuation";
import { openMapsWithDirections } from "@/src/utils/maps";
import { callNumber } from "@/src/utils/call";
import { getEmergencyData } from "@/src/services/emergencyDataService";
import { useNetwork } from "@/src/hooks/useNetwork";

export default function SafetyScreen() {
    const { isConnected } = useNetwork()

    const [centers, setCenters] = useState<Evacuation[]>([])
    const [hotlines, setHotlines] = useState<Hotlines[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isNavigating, setIsNavigating] = useState<string | null>(null)
    // const [location, setLocation] = useState<{
    //     latitude: number,
    //     longitude: number
    // } | null>(null)

    const navigateCenter = async (centerName: string, lat: number, long: number) => {
        setIsNavigating(centerName)

        try {
            const coords = await getCurrentLocation()

            if (!coords) {
                Alert.alert("Failed to navigate center.")
                return
            }
            
            openMapsWithDirections(
                coords.latitude, 
                coords.longitude, 
                lat, 
                long, 
                "walking"
            )
        } finally {
            setIsNavigating(null)
        }
    }

    const redirectToDial = (number: string) => {
        callNumber(number)
    }

    useEffect(() => {
        const setLocationAndCenters = async () => {
            try {
                const location = await getCurrentLocation()

                if (!location || !location.latitude || !location.longitude)
                    Alert.alert("Location unavailable")

                const { centers, hotlines } = await getEmergencyData(isConnected, location)

                setCenters(centers)
                setHotlines(hotlines)
            } catch (err) {
                console.log(err)
                Alert.alert("Emergency data is temporarily unavailable")
            } finally {
                setLoading(false)
            }
        }
        
        setLocationAndCenters()
    }, [])

    return (
        <ScrollView
            className="bg-pink_white"
        >
            <GradientHeader 
                colors={['rgba(0, 153, 100, 1)', 'rgba(82, 216, 70, 1)']}
            />

            {loading ? (
                <View
                    className="justify-center items-center h-[500] w-full"
                >
                    <ActivityIndicator size={70} />
                </View>
            ) : (
                <View
                    className="px-7 mt-[-60px] gap-5 pb-7"
                >
                    <SafeZones values={centers} navigateCenter={navigateCenter} isNavigating={isNavigating} />
                    <Contacts contacts={hotlines} redirectToDial={redirectToDial} />
                </View>
            )}
        </ScrollView>
    )
}
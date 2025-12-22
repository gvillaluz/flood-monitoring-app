import { getCurrentLocation } from "../utils/location";
import { Evacuation, Hotlines } from "../types/Evacuation";
import { fetchEmergencyHotlines, fetchEvacuationCenters } from "@/src/api/emergency";
import { calculateDistance } from "@/src/utils/distance";
import { getCacheCentersAndHotlines, setCacheCentersAndHotlines } from "@/src/utils/cache";
import { checkConnectivty } from "@/src/utils/netinfo";

async function resolveEmergencyData(isConnected: boolean) {
    try {
        const isConnected = await checkConnectivty()
        const cache = await getCacheCentersAndHotlines()

        if (cache?.data && !cache.isExpired) {
            return {
                evacuationCenters: cache.data.evacuationCenters,
                emergencyHotlines: cache.data.emergencyHotlines,
                source: "cache"
            }
        }

        if (!isConnected) 
            return null

        const evacuationCenters = await fetchEvacuationCenters()
        const emergencyHotlines = await fetchEmergencyHotlines()

        if (!evacuationCenters || !emergencyHotlines) {
            console.log("Failed to fetch evacuation centers or emergency hotlines")
            return null
        }

        await setCacheCentersAndHotlines({
            evacuationCenters,
            emergencyHotlines
        })

        return {
            evacuationCenters,
            emergencyHotlines,
            source: "network"
        }
    } catch (err) {
        throw err
    }
}

function mapEmergencyData(
    centers: Evacuation[],
    hotlines: Hotlines[],
    location: {
        latitude: number,
        longitude: number
    }
) {
    const mappedCenters = centers
        .map((c: any) => ({
            centerName: c.center_name,
            amenity: c.amenity,
            latitude: c.latitude,
            longitude: c.longitude,
            distanceFromLocation: location ? calculateDistance(
                location.latitude,
                location.longitude,
                c.latitude,
                c.longitude
            ) : null
        }))
        .sort(
            (a: Evacuation, b: Evacuation) =>
                (a.distanceFromLocation ?? Infinity) -
                (b.distanceFromLocation ?? Infinity)
        )
        .slice(0, 5)

    const mappedHotlines = hotlines
        .map((h: any) => ({
            hotlineName: h.hotline_name,
            hotlineNumber: h.hotline_number
        }))

    return {
        mappedCenters,
        mappedHotlines
    }
}

export async function getEmergencyData(
    isConnected: boolean,
    location: {
        latitude: number,
        longitude: number
    }
) {
    const result = await resolveEmergencyData(isConnected)
    
    if (!result?.evacuationCenters || !result?.emergencyHotlines)
        throw new Error("Failed to get emergency data")

    const data = mapEmergencyData(
        result.evacuationCenters,
        result.emergencyHotlines,
        location
    )

    if (!data || !data.mappedCenters || !data.mappedHotlines)
        throw new Error("Failed to process data")

    return {
        centers: data.mappedCenters,
        hotlines: data.mappedHotlines,
        source: result.source
    }
}
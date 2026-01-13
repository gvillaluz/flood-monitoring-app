import { fetchWaterLevels } from "../api/water-level";
import { WaterLevel } from "../types/Flood";
import { getCacheWaterLevels, setCacheWaterLevels } from "../utils/cache";

async function resolveWaterLevel(isConnected: boolean) {
    const cache = await getCacheWaterLevels()

    if (!isConnected && cache?.data) {
        return {
            waterLevels: cache?.data,
            source: "cache"
        }
    }
    
    const waterLevels = await fetchWaterLevels()

    if (!waterLevels)
        return null

    await setCacheWaterLevels(waterLevels)

    return {
        waterLevels,
        source: "network"
    }
}

function mapWaterLevels(waterLevels: WaterLevel[]) {
    const mappedWaterLevels: WaterLevel[] = waterLevels
        .map(
            (w: any, index: number, arr: any[]) => (
                {
                    stationName: w.station_name,
                    timestamp: new Date(w.timestr),
                    waterLevel: w.wl,
                    waterLevel10m: w.wl_10m,
                    waterLevelChange: w.wl_change,
                    isRising: 
                        index < arr.length - 1
                        ? (w.wl === arr[index + 1].wl
                            ? (index + 2 < arr.length ? w.wl > arr[index + 2].wl : false)
                            : w.wl > arr[index + 1].wl)
                        : false
                }
            )
        )
        .slice(0, 6)

        return mappedWaterLevels
}

export async function getWaterLevels(isConnected: boolean) {
    const result = await resolveWaterLevel(isConnected)

    if (!result?.waterLevels)
        throw new Error("Live water levels are unavailable")

    const waterLevels = mapWaterLevels(result.waterLevels)

    if (!waterLevels)
        throw new Error("Failed to process water levels")

    return {
        waterLevels,
        source: result.source
    }
}
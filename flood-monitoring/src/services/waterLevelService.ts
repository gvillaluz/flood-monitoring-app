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
                    timestamp: new Date(w.timestamp),
                    waterLevel: w.water_level,
                    waterLevel10m: w.water_level_10m,
                    waterLevelChange: w.water_level_change,
                    isRising: 
                        index < arr.length - 1
                        ? (w.water_level === arr[index + 1].water_level
                            ? (index + 2 < arr.length ? w.water_level > arr[index + 2].water_level : false)
                            : w.water_level > arr[index + 1].water_level)
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
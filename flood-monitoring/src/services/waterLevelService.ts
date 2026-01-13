import { fetchWaterLevels } from "../api/water-level";
import { FloodRecord } from "../types/Flood";
import { getCacheWaterLevels, setCacheWaterLevels } from "../utils/cache";

async function resolveWaterLevel(isConnected: boolean) {
    const cache = await getCacheWaterLevels()

    if (!isConnected && cache?.data) {
        return {
            floodRecords: cache?.data,
            source: "cache"
        }
    }
    
    const floodRecords = await fetchWaterLevels()

    if (!floodRecords)
        return null

    await setCacheWaterLevels(floodRecords)

    return {
        floodRecords,
        source: "network"
    }
}

function mapFloodRecords(floodRecords: FloodRecord[]) {
    const mappedFloodRecords: FloodRecord[] = floodRecords
        .map(
            (w: any, index: number, arr: any[]) => (
                {
                    timestamp: new Date(w.timestr),
                    waterLevel: w.wl,
                    waterLevelChange: w.wl_change,
                    predictedWaterLevel: w.predicted_wl,
                    predictionStatus: w.prediction_status,
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

        return mappedFloodRecords
}

export async function getFloodRecords(isConnected: boolean) {
    const result = await resolveWaterLevel(isConnected)

    if (!result?.floodRecords)
        throw new Error("Live water levels are unavailable")

    const floodRecords = mapFloodRecords(result.floodRecords)

    if (!floodRecords)
        throw new Error("Failed to process water levels")

    return {
        floodRecords,
        source: result.source
    }
}
import AsyncStorage from "@react-native-async-storage/async-storage";

const EMERGENCY_CACHE_KEY = "evacuation_centers_and_emergency_hotlines"
const EMERGENCY_CACHE_TTL = 24 * 60 * 60 * 1000

const WATER_CACHE_KEY = "water_levels";
const WATER_CACHE_TTL = 3 * 60 * 1000;

export async function setCacheCentersAndHotlines(data: any) {
    await setWithTTL(EMERGENCY_CACHE_KEY, data)
}

export async function getCacheCentersAndHotlines() {
    return await getWithTTL(EMERGENCY_CACHE_KEY, EMERGENCY_CACHE_TTL)
}

export async function refreshEmergencyCache() {
    await AsyncStorage.removeItem(EMERGENCY_CACHE_KEY)
}

export async function setCacheWaterLevels(data: any) {
    await setWithTTL(WATER_CACHE_KEY, data)
}

export async function getCacheWaterLevels() {
    return await getWithTTL(WATER_CACHE_KEY, WATER_CACHE_TTL)
}

export async function setIsOnboarded(isOnBoarded: boolean) {
    await AsyncStorage.setItem("isOnBoarded", JSON.stringify(isOnBoarded))
}

export async function getIsOnboarded() {
    let data = await AsyncStorage.getItem("isOnBoarded")

    if (data) JSON.parse(data)

    return data
}

// export async function setOfflineCacheWaterLevel(data: any) {
//     await AsyncStorage.setItem(WATER_CACHE_KEY, data)
// }

// export async function getOfflineCacheWaterLevel() {
//     return await AsyncStorage.getItem(WATER_CACHE_KEY)
// }

async function getWithTTL(key: string, ttl: number) {
    try {
        const cached = await AsyncStorage.getItem(key)

        if (!cached) 
            return null

        const { data, timestamp } = JSON.parse(cached)

        const isExpired = Date.now() - timestamp > ttl

        return {
            data,
            isExpired
        }
    } catch {
        return null
    }
}

async function setWithTTL(key: string, data: any) {
    await AsyncStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now()}))
}
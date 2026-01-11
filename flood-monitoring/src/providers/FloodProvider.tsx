import { createContext, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { msUntilNextMinute } from "../utils/time_utils";
import { FloodContextValue, FloodProviderProps, WaterLevel, Prediction } from "../types/Flood";
import { getWaterLevels } from "../services/waterLevelService";
import { useNetwork } from "../hooks/useNetwork";

export const FloodContext  = createContext<FloodContextValue | undefined>(undefined);

export function FloodProvider({ children }: FloodProviderProps) {
    const { isConnected } = useNetwork()

    const [waterLevels, setWaterLevels] = useState<WaterLevel[]>([])
    const [prediction, setPrediction] = useState<Prediction>()
    const [risk, setRisk] = useState<string>("")
    const [refreshing, setRefreshing] = useState<boolean>(false)
    
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null)

    const TARGET_MINUTES = [8, 18, 28, 38, 48, 58];
    const TEN_MINUTES = 10 * 60 * 1000;

    const loadData = async (): Promise<void> => {
        try {
            const data = await getWaterLevels(isConnected)
            
            setWaterLevels(data.waterLevels)
        } catch (err) {
            console.log("Unable to fetch data. -- FloodProvider")
            console.log(err)
        } finally {
            setRefreshing(false)
        }
    }

    const clearTimers = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        if (intervalRef.current) clearInterval(intervalRef.current)
    }

    const startPolling = () => {
        clearTimers()

        const delay = msUntilNextMinute(TARGET_MINUTES)

        timeoutRef.current = setTimeout(async () => {
            await loadData()

            intervalRef.current = setInterval(() => loadData(), TEN_MINUTES)
        }, delay)
    }

    useEffect(() => {
        loadData()
        startPolling()

        const sub = AppState.addEventListener("change", (state: AppStateStatus) => {
            if (state === "active") {
                loadData()
                startPolling()
            } else {
                clearTimers()
            }
        })

        return () => {
            clearTimers()
            sub.remove()
        }
    }, [isConnected])

    const onRefresh = () => {
        setRefreshing(true)
        loadData()
        startPolling()
    }

    const data = {
        waterLevels,
        prediction,
        risk,
        onRefresh,
        refreshing
    }

    return <FloodContext.Provider value={data}>
        { children }
    </FloodContext.Provider>
}
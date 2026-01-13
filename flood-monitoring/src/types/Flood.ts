import { ReactNode } from "react"

export interface FloodRecord {
    timestamp: Date,
    waterLevel: number
    waterLevelChange: number | null
    predictedWaterLevel: number | null
    predictionStatus: string | null
    isRising: boolean | null
}

export interface Prediction {
    timestamp: Date,
    predictionWater1h: number | null,
    isRising: boolean | null
}

export interface FloodContextValue {
    floodRecords: FloodRecord[],
    prediction?: Prediction[],
    status: string,
    onRefresh: () => void,
    refreshing: boolean
}

export interface FloodProviderProps {
    children: ReactNode
}
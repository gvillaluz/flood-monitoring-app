import { ReactNode } from "react"

export interface WaterLevel {
    stationName: string,
    timestamp: Date,
    waterLevel: number
    waterLevel10m: number | null
    waterLevelChange: number | null
    isRising: boolean | null
}

export interface Prediction {
    timestamp: Date,
    predictionWater1h: number,
    predictionWater2h: number 
}

export interface FloodContextValue {
    waterLevels: WaterLevel[],
    prediction?: Prediction,
    risk: string
}

export interface FloodProviderProps {
    children: ReactNode
}
import { useContext } from "react";
import { FloodContext } from "../providers/FloodProvider";
import { FloodContextValue } from "../types/Flood";

export function useFlood(): FloodContextValue {
    const context = useContext(FloodContext)
    if (!context) 
        throw new Error("useFlood must be used within a FloodProvider")

    return context
}
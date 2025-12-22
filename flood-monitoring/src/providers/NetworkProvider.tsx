import React, { useEffect, useState, createContext } from "react";
import NetInfo from '@react-native-community/netinfo'

export const NetworkContext = createContext<{ isConnected: boolean }>({ isConnected: true })

export function NetworkProvider({ children }: { children: React.ReactNode }) {
    const [isConnected, setIsConnected] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? true)
        })

        return () => unsubscribe()
    }, [])

    return <NetworkContext.Provider value={{ isConnected }}>
        { children }
    </NetworkContext.Provider>
}
import NetInfo from "@react-native-community/netinfo"

export function checkConnectivty() {
    return NetInfo.fetch().then(state => state.isConnected)
}
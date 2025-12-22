import { Linking, Platform } from "react-native";

export function openMapsWithDirections(
    originLat: number,
    originLong: number,
    destiLat: number,
    destiLong: number,
    mode: "walking"
) {
    const url = Platform.OS === "ios"
    ? `http://maps.apple.com/?saddr=${originLat},${originLong}&daddr=${destiLat},${destiLong}`
    : `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLong}&destination=${destiLat},${destiLong}&travelmode=${mode}`;

    Linking.openURL(url)
}
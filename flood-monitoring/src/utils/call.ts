import { Linking, Alert } from "react-native"

export function callNumber(phoneNumber: string) {
    const cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');

    const url = `tel:${cleanedNumber}`;

    Linking.canOpenURL(url)
    .then((supported) => {
            if (!supported) {
                Alert.alert("Calling is not supported on this device.")
            }

            Linking.openURL(url)
        }
    )
    .catch(() => {
        Alert.alert("Unable to place call.")
    })
}
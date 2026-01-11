import axios from 'axios'
import { Platform } from 'react-native'

export async function registerDevicePushToken(token: string) {
    try {
        console.log("Posting token...")
        const response = await axios.post("http://192.168.1.57:8000/api/register-token", {
            fcm_token: token,
            platform: Platform.OS
        })

        console.log(response.data)
    } catch (err) {
        console.log("Error in register device token" + err)
    }
}
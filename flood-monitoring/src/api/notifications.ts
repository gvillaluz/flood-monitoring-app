import axios from 'axios'

export async function registerDevicePushToken(token: string) {
    try {
        await axios.post("http://192.168.1.57:8000/api/register-token", {
            token: token
        })
    } catch (err) {
        console.log("Error in register device token" + err)
    }
}
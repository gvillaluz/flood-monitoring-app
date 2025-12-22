import axios from 'axios'

const HTTP_URL_DEVELOPMENT = 'http://192.168.1.57:8000/api/water/live-data'

export async function fetchWaterLevels() {
    try {
        const data = await axios.get(HTTP_URL_DEVELOPMENT)
        return data.data
    } catch (err) {
        console.log("Error in fetching: " + err)
    }
}
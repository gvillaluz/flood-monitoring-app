import axios from 'axios'

const HTTP_URL_DEVELOPMENT = 'https://flood-monitoring-app.onrender.com/api/latest/flood-records'

export async function fetchWaterLevels() {
    try {
        console.log("Fetching Flood Data")
        const data = await axios.get(HTTP_URL_DEVELOPMENT)
        console.log(data)
        return data.data
    } catch (err) {
        console.log("Error in fetching: " + err)
    }
}
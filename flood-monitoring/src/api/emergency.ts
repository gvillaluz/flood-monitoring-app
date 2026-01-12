import axios from "axios";

const URL = 'https://flood-monitoring-app.onrender.com/api'

export async function fetchEvacuationCenters() {
    try {
        const response = await axios.get(`${URL}/evacuation-centers`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export async function fetchEmergencyHotlines() {
    try {
        const response = await axios.get(`${URL}/emergency-hotlines`)
        return response.data
    } catch (err) {
        console.log(err)
    }
}
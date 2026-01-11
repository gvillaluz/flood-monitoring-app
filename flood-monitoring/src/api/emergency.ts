import axios from "axios";

const URL = 'http://192.168.1.57:8000/api'

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
import * as SecureStore from 'expo-secure-store'

const PENDING_TOKEN_KEY = "pending_token"
const SYNCED_TOKEN_KEY = "synced_token"

export async function savePendingToken(token: string) {
    await SecureStore.setItemAsync(PENDING_TOKEN_KEY, token)
}

export async function getPendingToken() {
    return await SecureStore.getItemAsync(PENDING_TOKEN_KEY)
}

export async function saveSyncedToken(token: string) {
    await SecureStore.setItemAsync(SYNCED_TOKEN_KEY, token)
}

export async function getSyncedToken() {
    return await SecureStore.getItemAsync(SYNCED_TOKEN_KEY)
}

export async function deletePendingToken() {
    await SecureStore.deleteItemAsync(PENDING_TOKEN_KEY)
}
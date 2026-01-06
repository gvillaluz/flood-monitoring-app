import { registerDevicePushToken } from "../api/notifications";

export async function syncWithBackend(token: string) {
    try {
        await registerDevicePushToken(token)
    } catch {}
}
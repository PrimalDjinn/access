import { revokeToken } from "./queries"
import type { H3Event } from "h3"

export async function revokeAuthToken(event: H3Event) {
    const token = readAuthToken(event)
    if (!token) return true

    await revokeToken(token)
    return true
}
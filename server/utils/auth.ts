import type { H3Event } from "h3"

export function collapseStr(val: any): null | boolean | string | undefined | any{
    if (typeof val !== "string") return val
    switch(true){
        case val === "":
        case val === "null":
            return null
        case val === "true":
            return true
        case val === "false":
            return false
        case val === "undefined":
            return undefined
        default:
            return val
    }
}

export function readAuthToken(event: H3Event) {
    let auth = event.headers.get("Authorization") || null
    if (!auth) auth = getCookie(event, "Authorization") || null
    if (!auth) return null

    let [bearer, token] = auth.split(" ")
    if (bearer !== "Bearer") return null

    token = token.trim()
    if (!collapseStr(token)) return null

    return token
}
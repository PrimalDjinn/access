import type { UserCookie } from "~~/types"

export function collapseStr(val: any){
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


export class User {
    static get isAuthenticated() {
        return !!this.authToken
    }

    /**
     * This function sets the auth cookie
     *
     * @param {string} token the string value of the token
     * @example
     * User.authToken = "token"
     */
    static set authToken(token: string) {
        const cookie = useCookie<UserCookie>("auth")
        const state = useUser().value
        cookie.value = token
        state.token = token
    }

    static get authToken(): string | null {
        const token = useUser().value?.token
        if (!collapseStr(token)) return this.authCookie
        return token
    }

    /**
     * Gets the user authentication cookie, labeled as `auth`
     *
     * @returns cookie
     */
    static get authCookie() {
        const cookie = useCookie<UserCookie>("auth").value
        if (!collapseStr(cookie)) return null
        return cookie
    }

    static get profilePicture() {
        const pic = useUser().value?.pic
        if (!collapseStr(pic)) return '/images/profile.png'
        return pic
    }
}
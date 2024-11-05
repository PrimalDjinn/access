import type {UserCookie, UserState} from "~~/types"
import type {Drizzle} from "~~/server/db/types";

export function collapseStr(val: any) {
    if (typeof val !== "string") return val
    switch (true) {
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
    static set authToken(token: string | null) {
        const cookie = useCookie<UserCookie>("auth")
        if (token) {
            cookie.value = token
        } else {
            cookie.value = null
        }
    }

    static get authToken(): string | null | undefined {
        return this.authCookie
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
        return useUser().then(user => user.value.picture || '/images/profile.png')
    }

    static async setUser(user: Drizzle.User.select | null) {
        const _user = await useUser()
        if (user) {
            _user.value.email = user.email
            _user.value.ulid = user.ulid
            if (user.picture) _user.value.picture = user.picture
        } else {
            _user.value = {
                email: undefined,
                ulid: undefined,
                token: undefined,
                picture: undefined
            }
        }
    }

    static set value(user: Drizzle.User.select | null) {
        this.setUser(user)
    }

    static get value(): Promise<UserState> {
        return useUser().then(user => user.value)
    }
}
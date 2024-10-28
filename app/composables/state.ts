import type { Drizzle } from "~~/server/db/types"
import type { UserState } from "~~/types"
import consola from "consola"

export const useUser = () => useState<UserState>('user', () => {
    const user = ref({} as UserState)
    const cookie = User.authCookie
    if (!cookie) return {} as UserState
    $fetch<Drizzle.User.select>("/api/users/me", {
        headers: {
            Authorization: `Bearer ${cookie}`
        },
        onRequestError({ error }) {
            if (import.meta.client) {
                window.alertError(error?.message || "An unknown error occurred")
            }
            consola.error(error?.message || "An unknown error occurred", error)
        },
        onResponseError({ error }) {
            consola.error(error)
            User.value = null
            User.authToken = null
        },
        onResponse({ response }) {
            if (!response.ok) return
            User.value = response._data
        }
    })

    return user
})
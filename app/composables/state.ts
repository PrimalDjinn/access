import type { Drizzle } from "~~/server/db/types"
import type { UserState } from "~~/types"
import consola from "consola"

export const useUser = () => useAsyncState<UserState>('user', async () => {
    const cookie = User.authCookie
    if (!cookie) return {} as UserState
    const data = await $fetch<Drizzle.User.select>("/api/users/me", {
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
    const user = {
        email: data.email,
        token: cookie,
        ulid: data.ulid,
    } satisfies UserState

    if (data.picture) (user as UserState).picture = data.picture
    return user
})


export const useAsyncState = async <T>(key: string, fn: () => Promise<T>, options?: {
    errors: Ref<Array<any>>
}) => {
    const { data: initial } = useNuxtData(key)
    if (initial.value) return Promise.resolve(initial as Ref<T>)
    const { data: _new, error } = await useAsyncData<T>(key, fn)
    if (error && options?.errors) {
        consola.error("An error occurred while fetching data for", key)
        consola.error(error)
        options.errors.value.push(error)
    }
    return _new as Ref<T>
}
import type {Drizzle} from "~~/server/db/types";
import consola from "consola";


export default defineNuxtPlugin(async () => {
    if (!User.authToken) return

    const user = useUser()
    if (!hasOwnProperties(user.value, ["email", "ulid", "token"], false)) {
        await useFetch<Drizzle.User.select>("/api/users/me", {
            headers: {
                Authorization: `Bearer ${User.authToken}`
            },
            onRequestError({error}) {
                alertError(error?.message || "An unknown error occurred")
            },
            onResponseError({error}) {
                consola.error(error)
                User.value = null
                User.authToken = null
            },
            onResponse({response}) {
                if (!response.ok) return
                User.value = response._data
            }
        })
    }
});
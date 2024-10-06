import type {Drizzle} from "~~/server/db/types";


export default defineNuxtPlugin(async () => {
    if (!User.authToken) return

    const user = useUser()
    if (!hasOwnProperties(user.value, ["email", "ulid", "token"], false)) {
        await useFetch<{
            user: Drizzle.User.select,
            token: string
        }>("/api/users/me", {
            headers: {
                Authorization: `Bearer ${User.authToken}`
            },
            onRequestError({error}) {
                alertError(error?.message || "An unknown error occurred")
            },
            onResponseError({error}) {
                alertError(error?.message || "An unknown error occurred")
            },
            onResponse({response}) {
                if (!response.ok) return
                const data = response._data
                User.value = data.user
                User.authToken = data.token
            }
        })
    }

    console.log("User is authenticated")
});
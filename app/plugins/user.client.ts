import type { Drizzle } from "~~/server/db/types";

export default defineNuxtPlugin(async () => {
    if(!User.authToken) return

    const user = useUser()
    if (!hasOwnProperties(user.value, ["email", "ulid", "token"], false)){
        await useFetch<{
            user: Drizzle.User.select,
            token: string
        }>("/api/users/me", {
            headers: {
                Authorization: `Bearer ${User.authToken}`
            },
            onRequestError(error) {
                console.error(error)
            },
            onResponseError(error){
                console.error(error)
            },
            onResponse ({response}) {
                const data = response._data
                user.value.email = data.user.email
                user.value.ulid = data.user.ulid
                user.value.token = data.token
                User.authToken = data.token
                user.value.picture = data.user.picture
            }
        })   
    }

    console.log("User is authenticated")
});
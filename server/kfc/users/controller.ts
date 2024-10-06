import {getUserByToken} from "./queries";

const router = createRouter()

router.get("/me", defineEventHandler(async event => {
    const token = readAuthToken(event)
    if (!token) return createError({statusCode: 401, message: "Unauthorized"})

    const user = await getUserByToken(token)
    if (!user) return createError({statusCode: 401, message: "Unauthorized"})

    return createResponse({
        statusCode: 200,
        data: user
    })
}))

export default useController("users", router)
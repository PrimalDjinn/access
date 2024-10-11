import {z} from "zod"
import {createUser} from "../users/queries";
import {createToken, revokeToken} from "./queries";
import {authenticate} from "./functions";

const router = createRouter()

router.post("/register", defineEventHandler(async event => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    })
    const {data, error} = await readValidatedBody(event, schema.safeParse)
    if (!data || error) return createError({
        statusCode: 400,
        message: error?.message,
        data: error?.errors
    })

    const user = await createUser(data).catch(e => e as Error)
    if (!user || user instanceof Error) return createError({
        statusCode: 500,
        message: user?.message || "Failed to create user"
    })
    const {token} = await createToken({userUlid: user.ulid})

    return createResponse({
        statusCode: 201,
        data: { user, token }
    })
}))

router.post("/login", defineEventHandler(async event => {
    const schema = z.object({
        email: z.string().email().trim(),
        password: z.string()
    })
    const {data, error} = await readValidatedBody(event, schema.safeParse)
    if (!data || error) return createError({
        statusCode: 400,
        message: error?.message,
        data: error?.errors
    })

    const result = await authenticate(data)
    if (!result) return createError({
        statusCode: 401,
        message: "Invalid email or password"
    })

    return createResponse({
        statusCode: 200,
        data: result
    })
}))

router.get("/logout", defineEventHandler(event => {
    const token = readAuthToken(event)
    clearAuthToken(event)
    if (token) revokeToken(token)
    return createResponse({
        statusCode: 200,
        statusMessage: "Logged out"
    })
}))

export default useController("auth", router)
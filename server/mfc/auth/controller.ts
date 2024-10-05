import {z} from "zod"
import {createUser} from "../users/queries";
import {revokeToken} from "../auth/queries";
import {authenticate} from "./methods";

const router = createRouter()

router.post("/register", defineEventHandler(async event => {
    const schema = z.object({
        email: z.string().email().trim(),
        password: z.string().min(8)
    })
    const {data, error} = await readValidatedBody(event, schema.safeParse)
    if (!data || error) return createError({
        statusCode: 400,
        message: error?.message,
        data: error?.errors
    })

    const user = await createUser(data)
    if (!user) return createError({
        statusCode: 500,
        message: "Failed to create user",
    })

    return createResponse({
        statusCode: 201,
        data: user
    })
}))

router.post("/login", defineEventHandler(async event => {
    const schema = z.object({
        email: z.string().email().trim(),
        password: z.string().min(8)
    })
    const {data, error} = await readValidatedBody(event, schema.safeParse)
    if (!data || error) return createError({
        statusCode: 400,
        message: error?.message,
        data: error?.errors
    })

    const user = await authenticate(data)
    if (!user) return createError({
        statusCode: 401,
        message: "Invalid email or password"
    })

    return createResponse({
        statusCode: 200,
        data: user
    })
}))

router.post("/logout", defineEventHandler(async event => {
    const token = readAuthToken(event)
    clearAuthToken(event)
    if (token) revokeToken(token)
    return createResponse({
        statusCode: 200,
        statusMessage: "Logged out"
    })
}))

export default useController("auth", router)
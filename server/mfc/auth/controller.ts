import {z} from "zod"
import {createUser} from "../users/queries";

const router = createRouter()

router.post("/register", defineEventHandler(async event => {
    const schema = z.object({
        email: z.string().email().trim(),
        password: z.string().min(8)
    })
    const {data, error} = await readValidatedBody(event, schema.safeParse)
    if (!data || error) return createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: error?.message,
        data: error?.errors
    })

    const user = await createUser(data)
    if (!user) return createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Failed to create user",
    })

    return createResponse({
        statusCode: 201,
        statusMessage: "Created",
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
        statusMessage: "Bad Request",
        message: error?.message,
        data: error?.errors
    })


}))

export default useController("auth", router)
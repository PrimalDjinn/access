import { z } from "zod"

export default defineEventHandler(async event => {
    const schema = z.object({
        email: z.string().email().trim(),
        password: z.string().min(8)
    })
    const { data, error } = await readValidatedBody(event, schema.safeParse)
    if (!data || error) return createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: error?.message,
        data: error?.errors
    })
})
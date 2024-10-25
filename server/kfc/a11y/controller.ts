import { isGithubUrl, assessGithubA11y, assessA11y } from "./functions"
import type { AxeResults } from "axe-core"
import { z } from "zod"

const router = createRouter()

router.get("/assess", defineEventHandler(async event => {
    const q = getQuery(event)?.q?.toString().trim()
    const schema = z.string().url()

    const { data, error } = schema.safeParse(q)
    if (!data || error) return createError({
        statusCode: 400,
        message: error?.message || "Missing query parameter 'q'. It should be a URL"
    })

    const response = await $fetch(data).catch(e => e as Error)
    if (!response || response instanceof Error) return createError({
        statusCode: 400,
        message: response?.message || "Invalid URL",
        data: response
    })

    let results: AxeResults[] | undefined | Error
    let result: AxeResults | undefined | Error
    if (isGithubUrl(data)) {
        results = await assessGithubA11y(data).catch(e => e as Error)
        if (!results || results instanceof Error) return createError({
            statusCode: 500,
            message: results?.message || "Failed to get a11y data",
            data: results
        })
    } else {
        result = await assessA11y(data).catch(e => e as Error)
        if (!result || result instanceof Error) return createError({
            statusCode: 500,
            message: result?.message || "Failed to get a11y data",
            data: result
        })
    }

    return createResponse({
        statusCode: 200,
        data: results || result
    })
}))

export default useController("a11y", router)
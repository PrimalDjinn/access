import type {H3Event, Router} from 'h3'
import consola from 'consola'

export function useController(folderName: string, router: Router) {
    router.use('/**', defineEventHandler((event: H3Event) => {
        consola.warn(`Unknown route: [${event.method}] ${event.path} was attempted to be accessed`)
        return createError({statusCode: 404, statusMessage: 'Not Found', message: 'Unknown route'})
    }))

    return useBase(`/${folderName}`, router.handler)
}

export function createResponse({statusCode = 200, data, headers, statusMessage}: {
    statusCode?: number;
    statusMessage?: string;
    data?: any,
    headers?: Record<string, string>
}) {
    let inferred: Record<string, string> = {}
    switch (typeof data) {
        case 'string':
            inferred = {'Content-Type': 'text/plain'}
            break
        case 'object':
            inferred = {'Content-Type': 'application/json'}
            data = JSON.stringify(data)
            break
        case 'number':
        case 'boolean':
        case "bigint":
        case "symbol":
            inferred = {'Content-Type': 'text/plain'}
            data = data.toString()
            break
        case 'function':
            const result = data()
            if (result instanceof Response) return result
            return createResponse({statusCode, data: result, headers: headers})
        default:
            inferred = {}
    }

    return new Response(data, {
        status: statusCode,
        statusText: statusMessage || undefined,
        headers: new Headers({...headers, ...inferred})
    })
}
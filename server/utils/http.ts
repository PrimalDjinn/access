import type { H3Event, Router } from 'h3'
import consola from 'consola'

export function useController(folderName: string, router: Router) {
    router.use('/**', defineEventHandler((event: H3Event) => {
        consola.warn(`Unknown route: [${event.method}] ${event.path} was attempted to be accessed`)
        return createError({ statusCode: 404, statusMessage: 'Not Found', message: 'Unknown route' })
    }))

    return useBase(`/${folderName}`, router.handler)
}
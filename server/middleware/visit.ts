import consola from "consola"
import type {H3Event} from "h3"

function announcer() {
    let time_start: number | undefined;
    return {
        handler(context: H3Event) {
            time_start = performance.now()
        },
        onBeforeResponse(context: H3Event) {
            if (!isVercel) consola.info(`[${context.node.req.method}]\t${context.node.req.url} - ${(performance.now() - (time_start || 0)).toLocaleString()}ms`)
        }
    }
}
export default defineEventHandler(announcer())

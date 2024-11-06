import { createHighlighter } from 'shiki';
import { format as _format } from 'prettier'
import * as parseHtml from 'prettier/parser-html'
export default defineNuxtPlugin(async () => {
    const highlighter = await createHighlighter({
        langs: ['html'],
        themes: ['light-plus']
    })

    function format(code: string) {
        return _format(code, {
            parser: 'html',
            plugins: [parseHtml]
        })
    }

    return {
        provide: { highlighter, format }
    }
})
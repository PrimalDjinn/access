import puppeteer from "puppeteer";

declare global {
    var $puppeteer: import("puppeteer").Browser
}

export default defineNitroPlugin(async app => {
    const $puppeteer = await puppeteer.launch({
        defaultViewport: {
            height: 1080,
            width: 1920
        },
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    Object.defineProperty(globalThis, "$puppeteer", {
        value: $puppeteer,
        writable: false,
        enumerable: true,
    })
})

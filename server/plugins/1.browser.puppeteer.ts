import puppeteer from "puppeteer";

declare global {
    var $puppeteer: import("puppeteer").Browser
}

export default defineNitroPlugin(async app => {
    const $puppeteer = await puppeteer.launch();
    Object.defineProperty(globalThis, "$puppeteer", {
        value: $puppeteer,
        writable: false,
        enumerable: true,
    })
})
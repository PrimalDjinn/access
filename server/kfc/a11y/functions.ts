import { simpleGit as git } from "simple-git"
import { join, sep } from "path";
import glob from "fast-glob";
import { unlink } from "fs/promises";
import { AxePuppeteer } from "@axe-core/puppeteer";
import { A11yResults } from "~~/types";

export function getRepoPathName(url: string) {
    return url.split("/").filter((part) => part.trim().length > 0).slice(-2).join(sep);
}

export function isGithubUrl(url: string) {
    return /^https:\/\/github\.com\/[^/]+\/[^/]+/.test(url);
}

export async function assessGithubA11y(link: string) {
    const rpath = getRepoPathName(link)
    const fpath = join("/tmp", rpath);
    await git().clone(link, fpath);
    const files = await glob(fpath + "/**/*.html");
    const results = await Promise.allSettled(files.map(assessFile)).then((results) => results.map(result => {
        if (result.status === "fulfilled") return {
            result: result.value,
            error: undefined
        };
        return {
            result: undefined,
            error: result.reason
        }
    }))
    unlink(fpath);
    return results;
}

async function assessFile(file: string) {
    const url = "file://" + file;
    return assessA11y(url);
}
 
export async function assessA11y(url: string) {
    const browser = $puppeteer;
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle2"});
    const screenshot = await page.screenshot({ encoding: "base64"});
    const results = await new AxePuppeteer(page).analyze() as A11yResults;
    results.screenshot = screenshot;
    page.close();
    return results;
}
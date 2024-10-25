import { simpleGit as git } from "simple-git"
import { join, sep } from "path";
import { glob } from "fast-glob";
import { unlink } from "fs/promises";
import puppeteer from "puppeteer";
import { AxePuppeteer } from "@axe-core/puppeteer";

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
    const results = await Promise.all(files.map(assessFile));
    unlink(fpath);
    return results;
}

export async function assessA11y(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const results = await new AxePuppeteer(page).analyze();
    await browser.close();
    return results;
}

async function assessFile(file: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("file://" + file);
    const results = await new AxePuppeteer(page).analyze();
    await browser.close();
    return results;
}
import { Page, BrowserType, chromium } from "playwright";
import ContextEssentials from "@odg/essentials-crawler-node/Context/Context";
import { config } from "dotenv";
import Browser from "./Context/Browser";
import ExampleGoogleCrawlerController from "./Controllers/ExampleGoogleCrawlerController";
import Context from "./Context/Context";

config();

const browser = new Browser<BrowserType, Page>(
    chromium,
    Context as typeof ContextEssentials,
);

browser.initBrowser().then(async () => {
    const context = await browser.newContext(undefined, browser.persistentContext);
    const page = await context.newPage();

    const Crawler = new ExampleGoogleCrawlerController(page);
    await Crawler.exampleSearch();

    console.log("Done...");

    return process.exit();
});

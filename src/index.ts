import { Page, BrowserType, chromium } from "playwright";
import ContextEssentials from "@odg/essentials-crawler-node/Context/Context";
import { config } from "dotenv";
import Browser from "./Context/Browser";
import Context from "./Context/Context";
import EpicGamesController from "./Controllers/EpicGamesController";
import { BrowserContextOptionsContract } from "@odg/essentials-crawler-node";

config();

const browser = new Browser<BrowserType, Page>(
    chromium,
    Context as typeof ContextEssentials,
);

browser.initBrowser()
    .then(async () => {
        const context = await browser.newContext(
            { storageState: "./current-state.json" } as BrowserContextOptionsContract,
            browser.persistentContext,
        );
        const page = await context.newPage();

        const Crawler = new EpicGamesController(page);
        await Crawler.startCrawler();

        console.log("Done...");

        return true;
    })
    .catch(console.log.bind(console))
    .finally((async () => {
        if (!browser.persistentContext) {
            const contextBase = browser.browser?.contexts()[0];
            await contextBase?.storageState({
                path: "./current-state.json",
            }).catch((exception) => console.error(exception));
        }
        await browser.browser?.close();
        process.exit();
    }) as () => void);

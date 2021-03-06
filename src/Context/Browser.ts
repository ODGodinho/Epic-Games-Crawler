import { BrowserLaunchOptionsContract } from "@odg/essentials-crawler-node";
import BrowserEssentials from "@odg/essentials-crawler-node/Context/Browser";
import ContextEssentials from "@odg/essentials-crawler-node/Context/Context";
import { BrowserContract, BrowserTypeContract } from "../@types/Browser";
import { BrowserContextContract } from "../@types/Context";

import { PageContract } from "../@types/Page";

class Browser<
    BrowserType extends BrowserTypeContract<PageType>,
    PageType extends PageContract,
> extends BrowserEssentials<BrowserType, PageType, typeof ContextEssentials> {

    public declare browserType: BrowserType;

    public declare browser?: BrowserContract<PageType> | null;

    public persistentContext?: BrowserContextContract<PageContract>;

    public constructor(browserType: BrowserType, context: typeof ContextEssentials) {
        super(browserType, context);
    }

    protected browserOptions(): BrowserLaunchOptionsContract {
        return {
            headless: false,
            args: [
                "--wm-window-animations-disabled",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-infobars",
                "--disable-blink-features=AutomationControlled",
            ],
        };
    }

    public async initBrowser(): Promise<void> {
        if (process.env.PERSISTENT_BROWSER && this.browserType.launchPersistentContext) {
            this.browser = null;
            this.persistentContext = await this.browserType.launchPersistentContext(
                process.env.PERSISTENT_BROWSER,
                {},
            );

            return;
        }
        this.browser = await this.browserType.launch(this.browserOptions());
    }

}

export default Browser;

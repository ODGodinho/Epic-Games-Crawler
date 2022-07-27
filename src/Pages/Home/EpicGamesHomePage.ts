import { PageContract } from "../../@types/Page";
import BasePage from "../BasePage";

class EpicGamesHomePage<
    PageType extends PageContract,
> extends BasePage<PageType> {

    public readonly $s = this.$$s.EpicGamesHomeSelector;

    public async start(): Promise<this> {
        await this.goto();
        await this.clickLogin();

        return this;
    }

    public async goto(): Promise<void> {
        await this.page.goto(this.$s.EPIC_HOME_URL);
    }

    public async clickLogin(): Promise<void> {
        const loginButton = this.page.locator(this.$s.LOGIN_BUTTON);
        if (await loginButton.count() > 0) {
            await loginButton.click();
        }
    }

}

export default EpicGamesHomePage;

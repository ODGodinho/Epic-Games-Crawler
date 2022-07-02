import { PageContract } from "../../@types/Page";
import BasePage from "../BasePage";

class EpicGamesHomePage<
    PageType extends PageContract,
> extends BasePage<PageType> {

    public readonly $s = this.$$s.EpicGamesHomeSelector;

    public async start(): Promise<this> {
        await this.goto();

        return this;
    }

    public async goto(): Promise<void> {
        await this.page.goto(this.$s.EPIC_HOME_URL);
    }

}

export default EpicGamesHomePage;

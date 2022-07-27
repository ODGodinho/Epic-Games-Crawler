import "colors";
import Instances from "../@types/Instances";
import { PageContract } from "../@types/Page";
import EpicGamesAuthenticatorHandler from "../Handlers/Login/EpicGamesAuthenticatorHandler";
import EpicGamesLoginToAuthenticatorHandler from "../Handlers/Login/EpicGamesLoginToAuthenticatorHandler";
import { initInstances } from "../Pages/Pages";

export default class EpicGamesController {

    public page: PageContract;

    public $i: Instances<PageContract>;

    public constructor(page: PageContract) {
        this.page = page;
        this.$i = initInstances(this.page);
    }

    public async startCrawler(): Promise<void> {
        await this.$i.EpicGamesHomePage.start();
        await new EpicGamesLoginToAuthenticatorHandler(this.$i.EpicGamesLoginPage).start();
        await new EpicGamesAuthenticatorHandler(this.$i.EpicGamesLoginPage).start();

        console.log("FINISH".bgCyan.black);
    }

}

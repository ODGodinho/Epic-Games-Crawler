import "colors";
import Instances from "../@types/Instances";
import { PageContract } from "../@types/Page";
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

        console.log("Current Result:".bgCyan.black);
    }

}

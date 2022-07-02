import { PageContract } from "../../@types/Page";
import BasePage from "../BasePage";
import GoogleSearchPage from "../Search/GoogleSearchPage";

export default class GoogleSelectionEmptyPage<
    PageType extends PageContract,
> extends BasePage<PageType> {

    public readonly $s = this.$$s.GoogleSelectionEmptySelector;

    public constructor(page: PageType) {
        super(page);
    }

    public async start(): Promise<this> {
        await this.newSearch();

        return this;
    }

    public async newSearch(): Promise<GoogleSearchPage<PageType>> {
        return this.$i.GoogleSearchPage.start();
    }

}

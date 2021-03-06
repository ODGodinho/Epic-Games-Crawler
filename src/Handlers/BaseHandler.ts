import BaseHandlerEssentials, {
    HandlerState,
} from "@odg/essentials-crawler-node/Handlers/BaseHandler";
import Instances from "../@types/Instances";
import BasePage from "../Pages/BasePage";
import SelectorsTypeEssentials from "../@types/Selectors";
import { PageContract } from "../@types/Page";

export type HandlerFunction = () => Promise<HandlerState>;

abstract class BaseHandler<
    PageType extends PageContract,
> extends BaseHandlerEssentials<PageType> {

    public readonly basePage: BasePage<PageType>;

    public readonly page: PageType;

    public readonly $i: Instances<PageType>;

    public readonly $$s: SelectorsTypeEssentials;

    constructor(page: BasePage<PageType>) {
        super(page);
        this.basePage = page;
        this.$i = page.$i;
        this.$$s = page.$$s;
        this.page = page.page;
    }

    public abstract identifyHandler(): Promise<HandlerFunction>;

    public abstract start(): Promise<this>;

    public abstract defaultTimeout(): Promise<number>;

    public async resolvedSolution(): Promise<HandlerState> {
        return HandlerState.COMPLETED;
    }

    public async runSolution(solution: HandlerFunction): Promise<HandlerState.COMPLETED> {
        if (typeof solution === "function") {
            return solution().then(async (resolved: HandlerState) => {
                if (resolved === HandlerState.VERIFY) {
                    await this.start();

                    return HandlerState.COMPLETED;
                }

                return resolved;
            });
        }
        throw new Error("Error: Solution is not a function");
    }

}

export default BaseHandler;

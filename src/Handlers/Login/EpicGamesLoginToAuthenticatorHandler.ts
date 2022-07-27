import { HandlerState } from "@odg/essentials-crawler-node/Handlers/BaseHandler";
import { PageContract } from "../../@types/Page";
import BaseHandler, { HandlerFunction } from "../BaseHandler";

class EpicGamesLoginToAuthenticatorHandler<PageType extends PageContract> extends BaseHandler<PageType> {

    public identifyHandler(): Promise<HandlerFunction> {
        return Promise.race([
            this.identifyLogged(),
            this.identifyLogin(),
        ]);
    }

    public async defaultTimeout(): Promise<number> {
        return 60000;
    }

    private async identifyLogged(): Promise<HandlerFunction> {
        return this.page
            .waitForSelector(
                this.$$s.EpicGamesHomeSelector.LOGGED_BUTTON,
                { timeout: await this.defaultTimeout() },
            )
            .then(() => this.resolvedSolution.bind(this));
    }

    private async identifyLogin(): Promise<HandlerFunction> {
        return this.page
            .waitForSelector(
                this.$$s.EpicGamesHomeSelector.LOGIN_BUTTON,
                { timeout: await this.defaultTimeout() },
            )
            .then(() => this.loginSolution.bind(this));
    }

    private async loginSolution(): Promise<HandlerState> {
        await this.$i.EpicGamesLoginPage.start();

        return HandlerState.COMPLETED;
    }

    public async start(): Promise<this> {
        const solution = await this.identifyHandler();
        await this.runSolution(solution);

        return this;
    }

}

export default EpicGamesLoginToAuthenticatorHandler;

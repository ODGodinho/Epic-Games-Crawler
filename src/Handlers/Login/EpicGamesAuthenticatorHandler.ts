import { HandlerState } from "@odg/essentials-crawler-node/Handlers/BaseHandler";
import { PageContract } from "../../@types/Page";
import BaseHandler, { HandlerFunction } from "../BaseHandler";

class EpicGamesAuthenticatorHandler<PageType extends PageContract> extends BaseHandler<PageType> {

    public identifyHandler(): Promise<HandlerFunction> {
        return Promise.race([
            this.identifyTwoFactorAuthorization(),
            this.identifyLoginWithSuccess(),
        ]);
    }

    public async defaultTimeout(): Promise<number> {
        return 60000;
    }

    private async identifyTwoFactorAuthorization(): Promise<HandlerFunction> {
        return this.page
            .waitForSelector(
                this.$$s.EpicGamesLoginSelector.TWO_FACTOR_AUTHENTICATOR_INPUTS.FIRST,
                { timeout: await this.defaultTimeout() },
            )
            .then(() => this.twoFactorAuthorizationSolution.bind(this));
    }

    private async identifyLoginWithSuccess(): Promise<HandlerFunction> {
        return this.page
            .waitForSelector(
                this.$$s.EpicGamesHomeSelector.LOGGED_BUTTON,
                { timeout: await this.defaultTimeout() },
            )
            .then(() => this.resolvedSolution.bind(this));
    }

    private async twoFactorAuthorizationSolution(): Promise<HandlerState> {
        console.log("Please Complete: 2-factor authentication".yellow);
        await this.page.waitForTimeout(5000);

        return HandlerState.VERIFY;
    }

    public async start(): Promise<this> {
        const solution = await this.identifyHandler();
        await this.runSolution(solution);

        return this;
    }

}

export default EpicGamesAuthenticatorHandler;

import { PageContract } from "../../@types/Page";
import BasePage from "../BasePage";

class EpicGamesLoginPage<
    PageType extends PageContract,
    > extends BasePage<PageType> {

    public readonly $s = this.$$s.EpicGamesLoginSelector;

    public async start(): Promise<this> {
        await this.waitLoginLoad();
        await this.clickEpicLogin();
        await this.fillLoginEmail();
        await this.fillLoginPassword();
        await this.clickLoginButton();

        return this;
    }

    public async waitLoginLoad(): Promise<void> {
        await this.page.waitForSelector(this.$s.LOGIN_WITH_EPIC_BUTTON);
    }

    public async clickEpicLogin(): Promise<void> {
        await this.page.click(this.$s.LOGIN_WITH_EPIC_BUTTON);
    }

    public async fillLoginEmail(): Promise<void> {
        await this.page.type(this.$s.EMAIL_INPUT, `${process.env.USER_LOGIN}`, { delay: 70 });
    }

    public async fillLoginPassword(): Promise<void> {
        await this.page.type(this.$s.PASSWORD_INPUT, `${process.env.USER_PASSWORD}`, { delay: 70 });
    }

    public async clickLoginButton(): Promise<void> {
        await this.page.click(this.$s.SIGN_IN_BUTTON);
    }

    public async waitT(): Promise<void> {
        await this.page.click(this.$s.SIGN_IN_BUTTON);
    }

}

export default EpicGamesLoginPage;

import axios from "axios";
import { readFileSync } from "fs";
import { Cookie } from "playwright-core";
import FreeGamesInterface, { FreeGamesElement } from "../Interfaces/FreeGamesInterface";
import InitInterface from "../Interfaces/InitInterface";

export default class FreeGamesApiPage {

    public freeGames?: FreeGamesElement[];

    public async start(): Promise<this> {
        this.freeGames = await this.getFreeGames();
        const init = await this.initEpicRequest();
        await this.siteConfigRequest(init);
        ;

        return this;
    }

    public async getFreeGames(): Promise<FreeGamesElement[]> {
        const headersList = {
            "accept": "application/json, text/plain, */*",
            "origin": "https://store.epicgames.com",
        };

        const requestOptions = {
            url: process.env.FREE_GAMES_URL,
            method: "GET",
            headers: headersList,
        };

        return axios.request<FreeGamesInterface>(requestOptions)
            .then((response) => response.data.Catalog.searchStore.elements)
            .then((games) => games.filter((dataView) =>
                dataView.price.totalPrice.discountPrice === 0
                && dataView.offerType === "BASE_GAME",
            ));
    }

    public async initEpicRequest(): Promise<InitInterface> {
        const Session = JSON.parse(
            readFileSync("../../../current-state.json", "utf-8"),
        ) as { cookies: Cookie[] };

        const enableCookies = [
            "EPIC_DEVICE",
            "_tald",
            "MUID",
            "_ga",
            "EPIC_SSO_RM",
            "_epicSID",
            "EPIC_LOCALE_COOKIE",
            "EPIC_SSO",
            "EPIC_BEARER_TOKEN",
            "fptctx2",
            "__cf_bm",
        ];

        const headersList = {
            "authority": "talon-service-prod.ecosec.on.epicgames.com",
            "accept": "application/json, text/plain, */*",
            "accept-language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "content-type": "application/json",
            "cookie": Session.cookies.filter((cookie) =>
                cookie.domain.includes(".epicgames.com")
                && enableCookies.includes(cookie.name),
            )
                .map((cookie) => `${cookie.name}=${cookie.value}`)
                .join("; "),
        };

        const bodyContent = JSON.stringify({
            "flow_id": "checkout_free_prod",
        });

        const requestOptions = {
            url: "https://talon-service-prod.ecosec.on.epicgames.com/v1/init",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        };

        return axios.request<InitInterface>(requestOptions).then((response) => response.data);
    }

    public async siteConfigRequest(init: InitInterface): Promise<void> {
        const headersList = {
            "authority": "hcaptcha.com",
            "accept": "application/json",
            "accept-language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "content-length": "0",
            "content-type": "text/plain",
            "origin": "https://newassets.hcaptcha.com",
            "referer": "https://newassets.hcaptcha.com/",
        };

        const requestOptions = {
            url: `https://hcaptcha.com/checksiteconfig?v=baad5ef&host=store.epicgames.com&sitekey=${init.session.plan.h_captcha.site_key}&sc=1&swa=1`,
            method: "POST",
            headers: headersList,
        };

        await axios.request(requestOptions).then((response) => response.data);
    }

}

import Instances from "../@types/Instances";
import { PageContract } from "../@types/Page";
import BasePage from "./BasePage";
import EpicGamesHomePage from "./Home/EpicGamesHomePage";

export function initInstances(
    page: PageContract,
): Instances<PageContract> {
    const pages: Instances<PageContract> = {
        EpicGamesHomePage: new EpicGamesHomePage(page),
    };
    Object.values(pages).forEach((instance: BasePage<PageContract>) => instance.setInstances(pages));

    return pages;
}

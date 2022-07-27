import InstancesEssentials from "@odg/essentials-crawler-node/@types/Instances";
import EpicGamesHomePage from "../Pages/Home/EpicGamesHomePage";
import EpicGamesLoginPage from "../Pages/Login/EpicGamesLoginPage";
import { PageContract } from "./Page";

interface Instances<PageType extends PageContract> extends InstancesEssentials<PageType> {
    EpicGamesHomePage: EpicGamesHomePage<PageType>;
    EpicGamesLoginPage: EpicGamesLoginPage<PageType>;
}

export default Instances;

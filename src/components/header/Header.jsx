import React from "react";
import {useAppContext} from "../../context/AppContext";
import {AuthorizedNavigation} from "../navigation/AuthorizedNavigation";
import {Information} from "../minis/Information";
import {SkipLink} from "../pages/pagecomponents/SkipLink";
import {HeroHeader} from "./HeroHeader.jsx";
import {useLocation} from "react-router-dom";
import {ROUTES} from "../../helpers/constants/configConstants.jsx";


export const Header = () => {

    const {informationMessage, user, profile} = useAppContext();
    const location = useLocation();

    // Define routes where HeroHeader should NOT be displayed
    const disallowedHeroHeaderRoutes = [ROUTES.SUCCESS, ROUTES.CHANGE_PASSWORD];

    const showHeroHeader = !user && !profile && !disallowedHeroHeaderRoutes.includes(location.pathname);

    return user && profile ?
        <header className={"sms-header"}>
            <SkipLink/>
            <AuthorizedNavigation/>
            <Information message={informationMessage}/>
        </header>
        :
        (
            showHeroHeader && <HeroHeader/>
        )
};

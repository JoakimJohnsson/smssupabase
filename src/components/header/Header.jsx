import React, {useEffect, useState} from "react";
import {useAppContext} from "../../context/AppContext";
import {AuthorizedNavigation} from "../navigation/AuthorizedNavigation";
import {Information} from "../minis/Information";
import {SkipLink} from "../pages/pagecomponents/SkipLink";
import {HeroHeader} from "./HeroHeader.jsx";
import {useLocation} from "react-router-dom";
import {CONFIG, ROUTES} from "../../helpers/constants/configConstants.jsx";


export const Header = () => {

    const {informationMessage, user, profile} = useAppContext();
    const location = useLocation();
    const [doShowHeroHeader, setDoShowHeroHeader] = useState(false);

    // Define routes where HeroHeader should NOT be displayed
    const disallowedHeroHeaderRoutes = [ROUTES.SUCCESS, ROUTES.CHANGE_PASSWORD];

    useEffect(() => {
            if(!user && !profile && !disallowedHeroHeaderRoutes.includes(location.pathname)) {
                // Update messages after a while.
                const timer = setTimeout(() => {
                    setDoShowHeroHeader(true);
                }, CONFIG.TIMEOUT_XXL);
                return () => clearTimeout(timer);
            }
    }, []);

    return user && profile ?
        <header className={"sms-header"}>
            <SkipLink/>
            <AuthorizedNavigation/>
            <Information message={informationMessage}/>
        </header>
        :
        (
            doShowHeroHeader && <HeroHeader/>
        )
};

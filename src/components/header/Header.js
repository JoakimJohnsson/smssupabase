import React from "react";
import {useAppContext} from "../../context/AppContext";
import {AuthorizedNavigation} from "../navigation/AuthorizedNavigation";
import {Information} from "../minis/Information";
import {SkipLink} from "../pages/pagecomponents/SkipLink";


export const Header = () => {

    const {informationMessage, user, profile} = useAppContext();

    return user && profile && (
        <header className={"sms-header"}>
            <SkipLink/>
            <AuthorizedNavigation/>
            <Information message={informationMessage}/>
        </header>
    )
};

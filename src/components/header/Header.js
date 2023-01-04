import React from "react";
import {useAppContext} from "../../context/AppContext";
import {AuthorizedNavigation} from "../navigation/AuthorizedNavigation";
import {Information} from "../minis/Information";


export const Header = () => {
    const {user, informationMessage} = useAppContext();
    return user && (
        <header className={"sms-header"}>
            <AuthorizedNavigation/>
            <Information message={informationMessage}/>
        </header>
    )
};

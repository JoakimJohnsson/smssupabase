import React from 'react';
import {useAppContext} from "../../context/AppContext";
import {AuthorizedNavigation} from "../navigation/AuthorizedNavigation";

export const Header = () => {

    const {user} = useAppContext();

    return user ? (
            <header className={"sms-header"}>
                <AuthorizedNavigation/>
            </header>
        )
        :
        false
};

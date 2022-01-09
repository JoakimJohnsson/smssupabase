import React from 'react';
import AuthorizedNavigation from "./AuthorizedNavigation";
import UnauthorizedNavigation from "./UnauthorizedNavigation";
import {useAppContext} from "../../context/AppContext";

const Navigation = () => {

    const {user} = useAppContext();

    return (
        <>
            {user ?
                <AuthorizedNavigation/> : <UnauthorizedNavigation/>}
        </>
    )
};

export default Navigation;

import React from 'react';
import AuthorizedNavigation from "./AuthorizedNavigation";
import UnauthorizedNavigation from "./UnauthorizedNavigation";
import {useAuth} from "../../contexts/Auth";

const Navigation = () => {

    const {isAuthorized} = useAuth();

    return (
        <>
            {isAuthorized ?
                <AuthorizedNavigation/> : <UnauthorizedNavigation/>}
        </>
    )
};

export default Navigation;

import React from 'react';
import AuthorizedNavigation from "./AuthorizedNavigation";
import UnauthorizedNavigation from "./UnauthorizedNavigation";
import {useAuth} from "../../contexts/Auth";

const Navigation = () => {

    const {user} = useAuth();

    return (
        <>
            {user ?
                <AuthorizedNavigation/> : <UnauthorizedNavigation/>}
        </>
    )
};

export default Navigation;

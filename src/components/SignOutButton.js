import {useHistory} from "react-router-dom";
import React from "react";
import {useAuth} from "../contexts/Auth";
import {LoginIcon} from "@heroicons/react/solid";

const SignOutButton = () => {

    const {signOut} = useAuth();
    const history = useHistory();

    async function handleSignOut() {
        await signOut()
        history.push('/')
    }

    return (
        <button onClick={handleSignOut} className="nav-link"><LoginIcon className="h-5 w-5 inline mr-1"/>Sign out</button>
    )
}

export default SignOutButton;

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
        <button onClick={handleSignOut} className="nav-link">
            <LoginIcon className="sms-icon--link"/><span className={"sms-nav-link--text"}>Sign out</span>
        </button>
    )
}

export default SignOutButton;

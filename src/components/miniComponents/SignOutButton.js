import {useNavigate} from "react-router-dom";
import React from "react";
import {useAppContext} from "../../context/AppContext";
import {LogoutIcon} from "@heroicons/react/solid";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";

export const SignOutButton = () => {

    const {signOut} = useAppContext();
    const navigate = useNavigate();

    async function handleSignOut() {
        await signOut()
        navigate('/');
    }

    return (
        <button onClick={handleSignOut} className="nav-link border-0" aria-label={LABELS_AND_HEADINGS.SIGN_OUT}>
            <LogoutIcon className="sms-icon--link"/><span className={"sms-nav-link--text d-lg-none d-xl-inline"}>{LABELS_AND_HEADINGS.SIGN_OUT}</span>
        </button>
    )
}

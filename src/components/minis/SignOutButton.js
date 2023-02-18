import {useNavigate} from "react-router-dom";
import React from "react";
import {useAppContext} from "../../context/AppContext";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {faRightFromBracket} from "@fortawesome/pro-duotone-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const SignOutButton = ({mobile}) => {

    const {signOut, setUser, setRole} = useAppContext();
    const navigate = useNavigate();
    const size = mobile ? "1x" : "2x";

    async function handleSignOut() {
        await signOut().then(() => {
            setUser(null);
            setRole(null);
        })
        navigate("/");
    }

    return (
        <button onClick={handleSignOut} className="nav-link border-0" aria-label={LABELS_AND_HEADINGS.SIGN_OUT}>
            <FontAwesomeIcon icon={faRightFromBracket} size={size}/><span className={"sms-nav-link--text d-lg-none d-xl-inline"}>{LABELS_AND_HEADINGS.SIGN_OUT}</span>
        </button>
    )
}

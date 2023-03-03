import {useNavigate} from "react-router-dom";
import React from "react";
import {useAppContext} from "../../context/AppContext";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {LogoutIconDuoTone} from "../icons-duotone";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


export const SignOutButton = ({mobile}) => {

    const {signOut, setProfile, setUser} = useAppContext();
    const navigate = useNavigate();
    const size = mobile ? "1x" : "2x";

    async function handleSignOut() {
        await signOut().then(() => {
            setProfile(null);
            setUser(null);
        })
        navigate("/");
    }

    return !mobile ? (
            <OverlayTrigger
                key={"logout-tooltip"}
                placement={"bottom"}
                overlay={
                    <Tooltip id={"logout-tooltip"}>
                        {LABELS_AND_HEADINGS.SIGN_OUT}
                    </Tooltip>
                }
            >
                <button onClick={handleSignOut} className="nav-link border-0" aria-label={LABELS_AND_HEADINGS.SIGN_OUT}>
                    <LogoutIconDuoTone size={size}/> <span className={"sms-nav-link--text d-lg-none d-xl-inline"}>{LABELS_AND_HEADINGS.SIGN_OUT}</span>
                </button>
            </OverlayTrigger>
        )
        :
        <button onClick={handleSignOut} className="nav-link border-0" aria-label={LABELS_AND_HEADINGS.SIGN_OUT}>
            <LogoutIconDuoTone size={size}/> <span className={"sms-nav-link--text d-lg-none d-xl-inline"}>{LABELS_AND_HEADINGS.SIGN_OUT}</span>
        </button>
}

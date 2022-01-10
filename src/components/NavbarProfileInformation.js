import React from "react";
import {useAppContext} from "../context/AppContext";
import Spinner from "./Spinner";

const NavbarProfileInformation = () => {
    const {profile} = useAppContext();
    const prepareUrl = (url) => {
        if (url.substring(0, 7) !== 'http://') {
            return 'https://' + url;
        } else {
            return url;
        }
    }
    const userUrl = profile.website ? prepareUrl(profile.website) : false;
    const {avatarImageUrl} = useAppContext();

    return avatarImageUrl ? (
            <div className="nav-link pe-0 d-none d-lg-flex">
                {userUrl ?
                    <a href={userUrl}><img src={avatarImageUrl} className={"avatar-image"} alt={"avatar"}/></a>
                    :
                    <img src={avatarImageUrl} className={"avatar-image"} alt={"avatar"}/>
                }
            </div>
        )
        :
        <Spinner small={true} color={"text-primary"}/>
}

export default NavbarProfileInformation;

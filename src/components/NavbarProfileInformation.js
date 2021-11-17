import React, {useEffect, useState} from "react";
import {useAuth} from "../contexts/Auth";
import {downloadImage} from "../helpers/functions";
import Spinner from "./Spinner";

const NavbarProfileInformation = () => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const {profile} = useAuth();
    const prepareUrl = (url) => {
        if (url.substring(0, 7) !== 'http://') {
            return 'https://' + url;
        } else {
            return url;
        }
    }
    const userUrl = profile.website ? prepareUrl(profile.website) : false;

    useEffect(() => {
        if (profile.avatar_url) {
            downloadImage(profile.avatar_url, setAvatarUrl).then(() => "Do something");
        }
    }, [profile.avatar_url]);

    return avatarUrl ? (
            <div className="nav-link">
                {userUrl ?
                    <a href={userUrl}><img src={avatarUrl} className={"avatar-image"} alt={"avatar"}/></a>
                    :
                    <img src={avatarUrl} className={"avatar-image"} alt={"avatar"}/>
                }
            </div>
        )
        :
        <Spinner small={true} color={"text-primary"}/>
}

export default NavbarProfileInformation;

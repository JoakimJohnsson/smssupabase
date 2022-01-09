import React, {useEffect, useState} from "react";
import {useAppContext} from "../context/AppContext";
import {downloadImage} from "../helpers/functions";
import Spinner from "./Spinner";

const NavbarProfileInformation = () => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const {profile} = useAppContext();
    const prepareUrl = (url) => {
        if (url.substring(0, 7) !== 'http://') {
            return 'https://' + url;
        } else {
            return url;
        }
    }
    const userUrl = profile.website ? prepareUrl(profile.website) : false;

    useEffect(() => {
        if (profile.avatar_image_filename) {
            downloadImage(profile.avatar_image_filename, setAvatarUrl).then(() => "Do something");
        }
    }, [profile.avatar_image_filename]);

    return avatarUrl ? (
            <div className="nav-link pe-0 d-none d-lg-flex">
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

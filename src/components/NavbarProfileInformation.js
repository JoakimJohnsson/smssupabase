import React, {useEffect, useState} from "react";
import {useAuth} from "../contexts/Auth";
import {downloadImage} from "../helpers/functions";
import Spinner from "./Spinner";

const NavbarProfileInformation = () => {

    const [avatarUrl, setAvatarUrl] = useState(null);
    const {profile} = useAuth();

    useEffect(() => {
        if (profile.avatar_url) {
            downloadImage(profile.avatar_url, setAvatarUrl).then(() => "Do something");
        }
    }, [profile.avatar_url]);

    return avatarUrl ? (
            <div className="nav-link">
                <img src={avatarUrl} className={"avatar-image"} alt={"avatar"}/>
                <p className={"m-0"}>{profile.firstname}</p>
            </div>
        )
        :
        <Spinner small={true} color={"text-primary"}/>
}

export default NavbarProfileInformation;

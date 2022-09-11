import React from "react";
import {useAppContext} from "../context/AppContext";
import {Spinner} from "./miniComponents/Spinner";

export const NavbarProfileInformation = () => {
    const {avatarImageUrl, userUrl} = useAppContext();
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

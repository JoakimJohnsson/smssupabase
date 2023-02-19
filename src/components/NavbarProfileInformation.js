import React from "react";
import {useAppContext} from "../context/AppContext";
import {Spinner} from "./minis/Spinner";
import {prepareUrl} from "../helpers/functions";


export const NavbarProfileInformation = () => {

    const {profile} = useAppContext();

    return profile ? (
            <div className="nav-link pe-0 d-none d-lg-flex">
                {profile.website ?
                    <a href={prepareUrl(profile.website)}><img src={profile.image_url} className={"avatar-image"} alt={"avatar"}/></a>
                    :
                    <img src={profile.image_url} className={"avatar-image"} alt={"avatar"}/>
                }
            </div>
        )
        :
        <Spinner small={true} color={"text-primary"}/>
}

import React from "react";
import {useAppContext} from "../context/AppContext";
import {CustomSpinner} from "./minis/CustomSpinner";
import {prepareUrl} from "../helpers/functions/functions";


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
        <CustomSpinner size={"2x"} color={"text-primary"}/>
}

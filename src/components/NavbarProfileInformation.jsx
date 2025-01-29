import React from "react";
import {useAppContext} from "../context/AppContext";
import {CustomSpinner} from "./minis/CustomSpinner";
import {getRandomProfileImage, getUserName} from "../helpers/functions";
import {Link} from "react-router-dom";


export const NavbarProfileInformation = () => {

    const {profile} = useAppContext();

    return profile ? (
            <div className="nav-link pe-0 to-profile">
                <Link to={`/users/${profile.id}`} className={"hocus-standard"}
                      title={getUserName(profile)}>
                    <img src={profile.image_url ? profile.image_url : getRandomProfileImage()} className={"list-image"} alt={"avatar"}/>
                </Link>
            </div>
        )
        :
        <CustomSpinner size={"2x"} color={"text-primary"}/>
}

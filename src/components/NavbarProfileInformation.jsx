import React from "react";
import {useAppContext} from "../context/AppContext";
import {CustomSpinner} from "./minis/CustomSpinner";
import {getUserName} from "../helpers/functions";
import {Link} from "react-router-dom";
import marvel from "../assets/images/publishers/marvel.gif";


export const NavbarProfileInformation = () => {

    const {profile} = useAppContext();

    return profile ? (
            <div className="nav-link pe-0 d-none d-lg-flex to-profile">
                <Link to={`/users/${profile.id}`} className={"hocus-standard"}
                      title={getUserName(profile)}>
                    <img src={profile.image_url ? profile.image_url : marvel} className={"list-image"} alt={"avatar"}/>
                </Link>
            </div>
        )
        :
        <CustomSpinner size={"2x"} color={"text-primary"}/>
}

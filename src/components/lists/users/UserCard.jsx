import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getRandomProfileImage, getUserName} from "../../../helpers/functions";


export const UserCard = ({user}) => {

    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        if (user) {
            setDisplayName(getUserName(user));
        }
    }, [user])

    return user && (
        <li className={"user-card user-card--responsive"}>
            <Link to={`/users/${user.id}`} title={displayName}>
                <div className={"user-image--wrapper position-relative"}>
                    <img
                        src={user.image_url ? user.image_url : getRandomProfileImage()}
                        alt={displayName}
                        className="user-image"
                    />
                    <div className={"user-card--label"}><p className={"mb-0 py-1"}>{displayName}</p></div>
                </div>
            </Link>
        </li>
    )
}

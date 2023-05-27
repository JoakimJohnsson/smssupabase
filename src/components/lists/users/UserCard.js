import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export const UserCard = ({user}) => {

    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        if (user) {
            setDisplayName(user.firstname + " " + user.lastname);
        }
    }, [user])

    return user && (
        <li className={"user-card"}>
            <Link to={`/users/${user.id}`} title={displayName}>
                <div className={"user-image--wrapper position-relative"}>
                    <img
                        src={user.image_url}
                        alt={displayName}
                        className="user-image"
                    />
                    <div className={"user-card--label"}><p className={"mb-0 py-1"}>{displayName}</p></div>
                </div>
            </Link>
        </li>
    )
}

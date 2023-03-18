import React from "react";
import {Icon} from "../icons";
import {faBadge} from "@fortawesome/pro-regular-svg-icons";

export const MarvelKlubbenBadge = ({number}) => {

    return (
        <div className={"mb-2 d-inline-block"}>
            <div className={"fa-layers fa-fw fa-3x"}>
                <Icon icon={faBadge} className={"text-marvelklubben-0"}/>
                <span className={"fa-layers-text fs-smaller"}>{number}</span>
            </div>
        </div>
    )
}

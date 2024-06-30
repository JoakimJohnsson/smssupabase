import React from "react";
import {PANES} from "../../../../../helpers/constants/textConstants/texts";
import {getPostalTownOrCountry} from "../../../../../helpers/functions";
import {LazyTextPlaceholder} from "../../../../minis/LazyTextPlaceholder";
import {useUserPosition} from "../../../../../helpers/customHooks/useUserPosition";


export const CurrentUserLocation = () => {
    const {userLocation} = useUserPosition();

    return (
        <p className={"mb-0"}>
            <span className={"text-label"}>{PANES.MAP.YOUR_CURRENT_LOCATION}</span> {
            userLocation ?
                getPostalTownOrCountry(userLocation.address_components)
                :
                <LazyTextPlaceholder charCount={12}/>
        }
        </p>
    )
}

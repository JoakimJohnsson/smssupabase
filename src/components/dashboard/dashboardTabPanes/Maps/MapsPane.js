import React from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {useAppContext} from "../../../../context/AppContext";
import {LocationAccessMap} from "./LocationAccessMap";
import {ManualMap} from "./ManualMap";


export const MapsPane = () => {

    const {profile} = useAppContext();

    return (
        <div className={"sms-page-col"}>
            <HeadingWithBreadCrumbs text={PANES.MAPS.NAME}/>
            <div className={"col-12 col-md-8 col-xxl-6"}>
                <p className={"lead"}>{PANES.MAPS.LEAD_1}</p>
                <p className={"mb-5"}>{PANES.MAPS.TEXT_1}</p>
            </div>
            <div className={"col-12 pb-5"}>
                {
                    profile && profile.allow_location_access ?
                        <LocationAccessMap/>
                        :
                        <ManualMap/>
                }
            </div>
        </div>
    )
}

import React from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {useAppContext} from "../../../../context/AppContext";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";


export const MapsPane = () => {

    const {profile} = useAppContext();

    return (
        <div className={"sms-page-col"}>
            <HeadingWithBreadCrumbs text={PANES.MAPS.NAME}/>
            <div className={"col-12 col-md-8 col-xxl-6"}>
                <p className={"lead"}>{PANES.MAPS.LEAD_1}</p>
                <p>{PANES.MAPS.TEXT_1}</p>
                
                <p className={"mb-4"}><span
                    className={"text-label me-4"}>{LABELS.SECTIONS.USERS.ALLOW_LOCATION_ACCESS}:</span> {profile.allow_location_access === 0 ? "Nej" : "Ja"}
                </p>
            </div>
        </div>
    )
}

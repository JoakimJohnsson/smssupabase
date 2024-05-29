import React from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {SMSMap} from "./SMSMap";


export const MapsPane = () => {
    return (
        <div className={"sms-page-col"}>
            <HeadingWithBreadCrumbs text={PANES.MAPS.NAME}/>
            <div className={"col-12 col-md-8 col-xxl-6"}>
                <p className={"lead"}>{PANES.MAPS.LEAD_1}</p>
            </div>
            <div className={"col-12 pb-5"}>
                <SMSMap/>
            </div>
        </div>
    )
}

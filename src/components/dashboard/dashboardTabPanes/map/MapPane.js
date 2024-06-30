import React from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {SmsMap} from "./SmsMap";
import {APIProvider} from "@vis.gl/react-google-maps";


export const MapPane = () => {
    return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}>
            <div className={"sms-page-col"}>
                <HeadingWithBreadCrumbs text={PANES.MAP.NAME}/>
                <div className={"col-12 col-md-8 col-xxl-6 mb-5"}>
                    <p className={"lead"}>{PANES.MAP.LEAD_1}</p>
                    <p>{PANES.MAP.LEAD_2}</p>
                </div>
                <div className={"col-12 pb-5"}>
                    <SmsMap/>
                </div>
            </div>
        </APIProvider>
    )
}

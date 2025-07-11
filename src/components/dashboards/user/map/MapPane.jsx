import React from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {HeadingWithBreadcrumbs} from "../../../headings/HeadingWithBreadcrumbs.jsx";
import {SmsMap} from "./SmsMap";
import {APIProvider} from "@vis.gl/react-google-maps";


export const MapPane = () => {
    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_CLOUD_API_KEY}>
            <HeadingWithBreadcrumbs text={PANES.MAP.NAME}/>
            <div className={"col-12 col-md-8 col-xxl-6 mb-5"}>
                <p className={"lead"}>{PANES.MAP.LEAD_1}</p>
                <p>{PANES.MAP.LEAD_2}</p>
            </div>
            <SmsMap/>
        </APIProvider>
    )
}

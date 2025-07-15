import React from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {SmsMap} from "./SmsMap";
import {APIProvider} from "@vis.gl/react-google-maps";
import {PageMainContent} from "../../../pages/pagecomponents/PageMainContent.jsx";


export const MapPane = () => {
    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_CLOUD_API_KEY}>
            <PageMainContent heading={PANES.MAP.NAME}>
                <div className={"lead-wrapper"}>
                    <p className={"lead"}>{PANES.MAP.LEAD_1}</p>
                    <p>{PANES.MAP.LEAD_2}</p>
                </div>
                <SmsMap/>
            </PageMainContent>
        </APIProvider>
    )
}

import React from "react";
import {LABELS_AND_HEADINGS} from "../helpers/constants";
import {DemoIconDuoTone} from "./icons-duotone";


const Demo = () => {

    return (
        <div className={"sms-section--light"} id={"demo-section"}>
            <div className={"text-center mb-4 mb-sm-5"}>
                <DemoIconDuoTone size={"2x"} className={"fa-icon--cta"}/>
                <h2>{LABELS_AND_HEADINGS.DEMO}</h2>
            </div>
        </div>
    )
}

export default Demo;

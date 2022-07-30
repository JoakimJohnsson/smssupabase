import React from "react";
import {EmojiSadIcon} from "@heroicons/react/solid";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";

export const NoDataAvailable = () => {


    return (
        <div className={"d-flex align-items-center py-2 mb-3"}>
            <EmojiSadIcon className={"sms-icon--text-xl"} />
            <span className={"py-2 px-3 border"}>{LABELS_AND_HEADINGS.NO_DATA_AVAILABLE}</span>
        </div>
    )
}

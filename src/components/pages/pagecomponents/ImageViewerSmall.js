import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";


export const ImageViewerSmall = ({url, fileName, linked = false}) => {

    const altText = linked ? LABELS.COMMON.GO_TO + " " + fileName : fileName;

    return url && fileName ? (
            <img
                src={url}
                alt={altText}
                className="w-100 mb-3 bg-light"
            />
        )
        :
        (<NoDataAvailable/>)
}

import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";


export const ImageViewerLogo = ({url, fileName, linked = false}) => {

    const altText = linked ? LABELS_AND_HEADINGS.GO_TO + " " + fileName : fileName;

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

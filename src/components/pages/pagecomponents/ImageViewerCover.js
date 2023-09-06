import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";


export const ImageViewerCover = ({url, displayName, isCollectingIssue = false}) => {

    return url && displayName ? (
        <div className={`cover-image--wrapper${isCollectingIssue ? " collecting" : ""}`}>
            <img
                src={url}
                alt={displayName}
                className={`cover-image${isCollectingIssue ? "" : " grayscale"}`}
                loading={"lazy"}
            />
        </div>
        )
        :
        (<NoDataAvailable/>)
}

import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";


export const ImageViewerCover = ({url, displayName}) => {

    return url && displayName ? (
        <div className={"cover-image--wrapper"}>
            <img
                src={url}
                alt={displayName}
                className="cover-image"
            />
        </div>
        )
        :
        (<NoDataAvailable/>)
}

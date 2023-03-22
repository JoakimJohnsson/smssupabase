import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";


export const ImageViewerCover = ({url, fileName}) => {

    return url && fileName ? (
        <div className={"cover-image--wrapper"}>
            <img
                src={url}
                alt={fileName}
                className="cover-image"
            />
        </div>
        )
        :
        (<NoDataAvailable/>)
}

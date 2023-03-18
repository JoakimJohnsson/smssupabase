import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";


export const ImageViewerLogo = ({url, fileName}) => {

    return url && fileName ? (
            <img
                src={url}
                alt={fileName}
                className="w-100 mb-3 bg-light"
            />
        )
        :
        (<NoDataAvailable/>)
}

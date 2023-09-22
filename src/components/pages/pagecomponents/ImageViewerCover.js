import React, {useState} from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import CustomLightbox from "../../CustomLightbox";
import {Icon} from "../../icons";
import {faSearch} from "@fortawesome/pro-regular-svg-icons";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";


export const ImageViewerCover = ({url, displayName, isCollectingIssue = false}) => {

    const [openLightbox, setOpenLightbox] = useState(false);

    const slides = [{src: url}];

    return url && displayName ? (
            <>
                <div className={`cover-image--wrapper${isCollectingIssue ? " collecting" : ""} hocus-standard`}>
                    <img
                        src={url}
                        alt={displayName}
                        className={`cover-image${isCollectingIssue ? "" : " grayscale"}`}
                        loading={"lazy"}
                        onClick={() => setOpenLightbox(true)}
                        aria-label={LABELS_AND_HEADINGS.SHOW_ORIGINAL_IMAGE}
                    />
                    <Icon icon={faSearch} size={"1x"} className={`zoom-icon ${isCollectingIssue ? " bg-success" : " bg-secondary"}`}/>
                </div>
                <CustomLightbox slides={slides} openLightbox={openLightbox} setOpenLightbox={setOpenLightbox}/>
            </>
        )
        :
        (<NoDataAvailable/>)
}

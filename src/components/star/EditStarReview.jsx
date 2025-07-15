import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings.js";
import {Icon} from "../icons/Icons.jsx";
import {faStar} from "@fortawesome/pro-solid-svg-icons";
import {faStar as faStarRegular} from "@fortawesome/pro-regular-svg-icons";
import React from "react";

export const EditStarReview = ({stars, baseClasses, activeClasses, inactiveClasses, handleEditStarReview}) => {

    return (
        <div className={"sms-section--light variant variant--warning mb-4"}>
            <h2>{LABELS.COMMON.ADD_REVIEW}</h2>
            <div className={"mb-3 fs-1"}>
                <p className={"fs-3 mb-3"}>{LABELS.COMMON.REVIEW_YOURS}</p>
                {[...Array(5)].map((_, index) => (
                    <span
                        className={`${baseClasses} ${index < stars ? activeClasses : inactiveClasses}`}
                        key={index}
                        onClick={() => handleEditStarReview(index)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') handleEditStarReview(index);
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`${LABELS.COMMON.SET_REVIEW} ${index + 1} stars`}
                    ><Icon icon={index < stars ? faStar : faStarRegular}/></span>
                ))}
            </div>
        </div>
    )
};

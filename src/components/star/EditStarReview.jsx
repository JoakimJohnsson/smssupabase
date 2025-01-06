import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings.js";
import {Icon} from "../icons/index.jsx";
import {faStar} from "@fortawesome/pro-solid-svg-icons";
import {faStar as faStarRegular} from "@fortawesome/pro-regular-svg-icons";
import {faStar as faStarDuoTone, faTimes} from "@fortawesome/pro-duotone-svg-icons";
import {FunctionButton} from "../minis/FunctionButton.jsx";
import React, {useState} from "react";

export const EditStarReview = ({stars, setStars, saveReview}) => {

    const [open, setOpen] = useState(false);
    const baseClasses = "hocus-standard me-2";
    const activeClasses = "text-grade px-2 py-1 border border-grade rounded-5";
    const inactiveClasses = "text-grade-100 p-2 border border-light rounded-3";

    const handleEditStarReview = (index) => {
        const newStars = index + 1;
        setStars(newStars);
        saveReview(newStars);
    }

    return (
        <div className="mb-3">
            <FunctionButton
                variant={"btn-outline-warning"}
                icon={open ? faTimes : faStarDuoTone}
                onClick={() => setOpen(!open)}
                label={open ? LABELS.COMMON.CLOSE_REVIEW : LABELS.COMMON.REVIEW}
                showLabel={true}
            />
            {
                open &&
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
            }
        </div>
    )
};

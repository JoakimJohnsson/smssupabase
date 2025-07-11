import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings.js";
import {Icon} from "../icons/Icons.jsx";
import {faStar, faStarHalfStroke} from "@fortawesome/pro-solid-svg-icons";
import {faStar as faStarRegular} from "@fortawesome/pro-regular-svg-icons";
import React from "react";

export const StarReviewBadge = ({item}) => {

    return (
            <p className={`d-inline tag-badge text-black bg-warning mb-2`}>
                <span className={"me-2"}>{LABELS.COMMON.REVIEW_AVERAGE} {item.avg_rating.toFixed(1)}</span>
                {[...Array(Math.floor(item.avg_rating))].map((_, index) => (
                    <span aria-hidden={true} className={"text-grade"} key={`full-${index}`}><Icon
                        icon={faStar}/></span>
                ))}
                {/* Add a half star if there is a fractional part */}
                {item.avg_rating % 1 >= 0.5 && (
                    <span aria-hidden={true} className={"text-grade"} key="half"><Icon
                        icon={faStarHalfStroke}/></span>
                )}
                {/* Fill in the remaining empty stars */}
                {[...Array(5 - Math.ceil(item.avg_rating))].map((_, index) => (
                    <span aria-hidden={true} className={"text-grade-100"} key={`empty-${index}`}><Icon
                        icon={faStarRegular}/></span>
                ))}
            </p>
    )
};

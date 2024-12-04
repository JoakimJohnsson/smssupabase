import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings.js";
import {Icon} from "../icons/index.jsx";
import {faStar, faStarHalfStroke} from "@fortawesome/pro-solid-svg-icons";
import {faStar as faStarRegular} from "@fortawesome/pro-regular-svg-icons";

export const EditStarReview = ({item, stars, setStars, saveReview}) => {

    const handleEditStarReview = (index) => {
        const newStars = index + 1;
        setStars(newStars);
        saveReview(newStars);
    }

    return (
        <div className={"sms-section--light section--warning mb-4"}>
            <h2>{LABELS.COMMON.REVIEW}</h2>
            <div className={"mb-3 fs-1 d-flex align-items-center"}>
                <span className={"fs-3 me-3"}>{LABELS.COMMON.REVIEW_YOURS}</span>
                {[...Array(5)].map((_, index) => (
                    <span
                        className={index < stars ? "text-grade hocus-standard" : "text-grade-100 hocus-standard"}
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

            <div className={"fs-1 rounded-2"}>
                <span className={"fs-3 me-2"}>{LABELS.COMMON.REVIEW_AVERAGE}</span>
                <div className={"d-flex align-items-center"}
                     role="img"
                     aria-label={`${item.avg_rating.toFixed(1)} ${LABELS.COMMON.REVIEW_OF_5_STARS}`}
                >
                    <span className={"me-3 p-3 bg-elephant rounded-4"}>{item.avg_rating.toFixed(1)}</span>
                    {[...Array(Math.floor(item.avg_rating))].map((_, index) => (
                        <span aria-hidden={true} className={"text-grade"} key={`full-${index}`}><Icon icon={faStar}/></span>
                    ))}
                    {/* Add a half star if there is a fractional part */}
                    {item.avg_rating % 1 >= 0.5 && (
                        <span aria-hidden={true} className={"text-grade"} key="half"><Icon icon={faStarHalfStroke}/></span>
                    )}
                    {/* Fill in the remaining empty stars */}
                    {[...Array(5 - Math.ceil(item.avg_rating))].map((_, index) => (
                        <span aria-hidden={true} className={"text-grade-100"} key={`empty-${index}`}><Icon icon={faStarRegular}/></span>
                    ))}
                </div>
            </div>
        </div>
    )
};

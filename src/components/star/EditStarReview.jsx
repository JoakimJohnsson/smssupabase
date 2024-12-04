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
            <div className={"mb-2 fs-1 d-flex align-items-center"}>
                <span className={"fs-3 me-3"}>{LABELS.COMMON.REVIEW_YOURS}</span>
                {[...Array(5)].map((_, index) => (
                    <span
                        className={index < stars ? "text-grade" : "text-grade-100"}
                        key={index}
                        onClick={() => handleEditStarReview(index)}
                        style={{cursor: 'pointer'}}
                    ><Icon icon={index < stars ? faStar : faStarRegular}/></span>
                ))}
            </div>

            <div className={"fs-3 d-flex align-items-center rounded-2"}>
                <span className={"me-2"}>{LABELS.COMMON.REVIEW_AVERAGE} {item.avg_rating.toFixed(1)}</span>
                {[...Array(Math.floor(item.avg_rating))].map((_, index) => (
                    <span className={"text-grade"} key={`full-${index}`}><Icon icon={faStar}/></span>
                ))}
                {/* Add a half star if there is a fractional part */}
                {item.avg_rating % 1 >= 0.5 && (
                    <span className={"text-grade"} key="half"><Icon icon={faStarHalfStroke}/></span>
                )}
                {/* Fill in the remaining empty stars */}
                {[...Array(5 - Math.ceil(item.avg_rating))].map((_, index) => (
                    <span className={"text-grade-100"} key={`empty-${index}`}><Icon icon={faStarRegular}/></span>
                ))}
            </div>

        </div>
    )
};

import {useNavigate} from "react-router-dom";
import React from "react";
import {ArrowLeftIcon} from "@heroicons/react/solid";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";

export const BackButton = ({customClass}) => {

    const navigate = useNavigate();
    const className = "btn btn-primary " + customClass;
    async function handleBacking() {
        navigate(-1);
    }

    return (
        <button onClick={handleBacking} className={className} aria-label={LABELS_AND_HEADINGS.BACK}>
            <ArrowLeftIcon className="sms-icon--text-lg"/><span className={""}>{LABELS_AND_HEADINGS.BACK}</span>
        </button>
    )
}

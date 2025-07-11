import React from "react";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {useAppContext} from "../../../../context/AppContext";
import {updateReleaseDate} from "../../../../services/utilsService";
import {faCalendarHeart} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {DashboardSectionLight} from "../../../pages/pagecomponents/DashboardSectionLight.jsx";


export const UtilsSection = () => {

    const {setInformationMessage} = useAppContext();

    const handleClick = () => {
        updateReleaseDate(setInformationMessage).then();
    }

    return (
        <DashboardSectionLight>
            <h2>{LABELS.COMMON.UTILS}</h2>
            <p>{TEXTS.UTILS}</p>
            <h3>{LABELS.COMMON.RELEASE_DATE}</h3>
            <p>{TEXTS.UTILS_UPDATE_RELEASE_DATE}</p>
            <IconButton variant={"primary"} icon={faCalendarHeart} onClick={handleClick} label={LABELS.COMMON.UPDATE}/>
        </DashboardSectionLight>
    )
}

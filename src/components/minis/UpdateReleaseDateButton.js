import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {updateReleaseDate} from "../../services/utilsService";
import {IconButton} from "./IconButton";
import {faCalendarHeart} from "@fortawesome/pro-regular-svg-icons";
import {useAppContext} from "../../context/AppContext";


export const UpdateReleaseDateButton = () => {
    const {setInformationMessage} = useAppContext();

    const handleClick = () => {
        updateReleaseDate(setInformationMessage).then();
    }

    return (
        <IconButton variant={"primary"} icon={faCalendarHeart} onClick={handleClick}
                    label={LABELS_AND_HEADINGS.UPDATE}/>
    )
}

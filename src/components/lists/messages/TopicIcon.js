import React from "react";
import topicData from "../../../helpers/valueLists/topics.json";
import {getIconByName, Icon} from "../../icons";
import {getDataIcon} from "../../../helpers/functions/functions";

export const TopicIcon = ({topicId}) => {
    return topicId && (
        <Icon icon={getIconByName(getDataIcon(topicData, topicId))} className={"me-2 text-secondary fa-fw"}/>
    )
}

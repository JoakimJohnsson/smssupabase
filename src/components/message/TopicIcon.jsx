import React from "react";
import topicData from "../../helpers/valueLists/topics.json";
import {getIconByName, Icon} from "../icons/Icons.jsx";
import {getDataIcon, getDataShade} from "../../helpers/functions";

export const TopicIcon = ({topicId, size}) => {
    return topicId && (
        <Icon icon={getIconByName(getDataIcon(topicData, topicId))} className={`me-2 text-grade-${getDataShade(topicData, topicId) + " " + size} fa-fw`}/>
    )
}

import React from "react";
import topicData from "../../../helpers/valueLists/topics.json";
import {getIconByName, Icon} from "../../icons";
import {getDataIcon, getDataShade} from "../../../helpers/functions/functions";

export const TopicIcon = ({topicId}) => {
    return topicId && (
        <Icon icon={getIconByName(getDataIcon(topicData, topicId))} className={`me-2 text-grade-${getDataShade(topicData, topicId)} fa-fw`}/>
    )
}

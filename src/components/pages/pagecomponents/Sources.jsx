import React, {useEffect, useState} from "react";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {SourceLink} from "./SourceLink";


export const Sources = ({issue}) => {

    const [sources, setSources] = useState([]);

    useEffect(() => {
        if (issue.source) {
            setSources(issue.source.replaceAll("\\n").split(";"));
        }
    }, [issue.source]);

    return (
        <div className={"mb-4"}>
            <h2>{LABELS.COMMON.SOURCE_COMICS}</h2>
            {
                sources.length &&
                sources.map((source, index) => {
                    return (
                        <SourceLink key={index} source={source}/>
                    )
                })
            }
        </div>
    )
}

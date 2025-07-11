import React, {useState, useEffect} from "react";
import {Icon} from "../../icons/Icons.jsx";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";


export const SourceLink = ({source}) => {

    const [sourceArray, setSourceArray] = useState([]);
    const [sourceText, setSourceText] = useState("");
    const [sourceUrl, setSourceUrl] = useState("");

    useEffect(() => {
        if (source) {
            setSourceArray(source.split(" - "));
        }
    }, [source]);

    useEffect(() => {
        if (sourceArray.length && sourceArray.length === 2) {
            setSourceText(sourceArray[0]);
            setSourceUrl(sourceArray[1]);
        }
    }, [sourceArray]);

    return sourceText && sourceUrl && (
        <>
            <a className={"d-block"} href={sourceUrl} target={"_blank"} rel={"noreferrer"}>
                {sourceText}
                <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
            </a>
        </>
    )
}

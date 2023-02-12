import React, {useState} from "react";
import {Link} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {handleDelete} from "../serviceFunctions";
import {useAppContext} from "../../context/AppContext";
import {Icon} from "../icons";
import {faPenCircle, faCircleXmark, faBadgeCheck} from "@fortawesome/pro-duotone-svg-icons";
import {faBadge} from "@fortawesome/pro-regular-svg-icons";


export const ListToolBox = ({item, name, displayName, data, setData, showAdminInfo, route, table, imageBucket, isTitle, isIssue}) => {

    const [collectingTitle, setCollectingTitle] = useState(false);
    const [collectingIssue, setCollectingIssue] = useState(false);
    const editText = LABELS_AND_HEADINGS.EDIT + " " + displayName;
    const deleteText = LABELS_AND_HEADINGS.DELETE + " " + displayName;
    const collectTitleTextStart = LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + displayName;
    const collectTitleTextStop = LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + displayName;
    const collectTitleIcon = collectingTitle ? faBadgeCheck : faBadge;
    const collectIssueTextStart = LABELS_AND_HEADINGS.COLLECT_ISSUE_START + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP_2;
    const collectIssueIcon = collectingIssue ? faBadgeCheck : faBadge;
    const collectTitleBtnClassName = collectingTitle ? "btn text-success sms-icon-btn" : "btn text-light sms-icon-btn";
    const collectIssueBtnClassName = collectingIssue ? "btn text-success sms-icon-btn" : "btn text-light sms-icon-btn";
    const {setInformationMessage} = useAppContext();

    return showAdminInfo ? (
            <div className={"d-inline-block text-end"}>
                <Link to={route + item.id + "?edit=true"} className={"btn text-primary sms-icon-btn"} title={editText}>
                    <Icon icon={faPenCircle} className={"fa-xl"}/>
                    <span className={"visually-hidden"}>{editText}</span>
                </Link>
                <button
                    className={"btn text-danger sms-icon-btn"}
                    aria-label={deleteText}
                    onClick={() => handleDelete(table, item.id, name, setData, data, item.image_filename, imageBucket, setInformationMessage)}>
                    <Icon icon={faCircleXmark} className={"fa-xl"}/>
                </button>
            </div>
        )
        :
        isTitle || isIssue ?
            isTitle ?
                <div className={"d-inline-block text-end"}>
                    <button
                        className={collectTitleBtnClassName}
                        aria-label={collectingTitle ? collectTitleTextStop : collectTitleTextStart}
                        onClick={() => setCollectingTitle(!collectingTitle)}>
                        <Icon icon={collectTitleIcon} className={"fa-xl"}/>
                    </button>
                </div>
                :
                <div className={"d-inline-block text-end"}>
                    <button
                        className={collectIssueBtnClassName}
                        aria-label={collectingIssue ? collectIssueTextStop : collectIssueTextStart}
                        onClick={() => setCollectingIssue(!collectingIssue)}>
                        <Icon icon={collectIssueIcon} className={"fa-xl"}/>
                    </button>
                </div>
            :
            <></>
}
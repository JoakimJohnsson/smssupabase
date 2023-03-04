import React, {useState} from "react";
import {Link} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {handleDelete} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {useAppContext} from "../../context/AppContext";
import {Icon} from "../icons";
import {faPenCircle, faCircleXmark, faBadgeCheck, faBadge} from "@fortawesome/pro-duotone-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


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
    const collectTitleBtnClassName = collectingTitle ? "btn text-success sms-tool-btn" : "btn text-light sms-tool-btn";
    const collectIssueBtnClassName = collectingIssue ? "btn text-success sms-tool-btn" : "btn text-light sms-tool-btn";
    const {setInformationMessage} = useAppContext();

    return showAdminInfo ? (
            <div className={"d-inline-block text-end"}>
                <OverlayTrigger
                    key={"edit-tooltip"}
                    placement={"top"}
                    overlay={
                        <Tooltip id={"edit-tooltip"}>
                            {editText}
                        </Tooltip>
                    }
                >
                    <Link to={route + item.id + "?edit=true"} className={"btn text-primary sms-tool-btn"} title={editText}>
                        <Icon icon={faPenCircle} className={"fa-xl"}/>
                        <span className={"visually-hidden"}>{editText}</span>
                    </Link>
                </OverlayTrigger>

                <OverlayTrigger
                    key={"delete-tooltip"}
                    placement={"top"}
                    overlay={
                        <Tooltip id={"delete-tooltip"}>
                            {deleteText}
                        </Tooltip>
                    }
                >
                    <button
                        className={"btn text-danger sms-tool-btn"}
                        aria-label={deleteText}
                        onClick={() => handleDelete(table, item.id, name, setData, data, item.image_filename, imageBucket, setInformationMessage)}>
                        <Icon icon={faCircleXmark} className={"fa-xl"}/>
                    </button>
                </OverlayTrigger>
            </div>
        )
        :
        isTitle || isIssue ?
            <div className={"d-inline-block text-end"}>
                {
                    isTitle ?
                        <OverlayTrigger
                            key={"collect-title-tooltip"}
                            placement={"top"}
                            overlay={
                                <Tooltip id={"collect-title-tooltip"}>
                                    {collectingTitle ? collectTitleTextStop : collectTitleTextStart}
                                </Tooltip>
                            }
                        >
                            <button
                                className={collectTitleBtnClassName}
                                aria-label={collectingTitle ? collectTitleTextStop : collectTitleTextStart}
                                onClick={() => setCollectingTitle(!collectingTitle)}>
                                <Icon icon={collectTitleIcon} className={"fa-xl"}/>
                            </button>
                        </OverlayTrigger>
                        :
                        <OverlayTrigger
                            key={"collect-issue-tooltip"}
                            placement={"top"}
                            overlay={
                                <Tooltip id={"collect-issue-tooltip"}>
                                    {collectingIssue ? collectIssueTextStop : collectIssueTextStart}
                                </Tooltip>
                            }
                        >
                            <button
                                className={collectIssueBtnClassName}
                                aria-label={collectingIssue ? collectIssueTextStop : collectIssueTextStart}
                                onClick={() => setCollectingIssue(!collectingIssue)}>
                                <Icon icon={collectIssueIcon} className={"fa-xl"}/>
                            </button>
                        </OverlayTrigger>
                }
            </div>
            :
            <></>
}

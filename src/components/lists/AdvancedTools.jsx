import React from "react";
import {Link} from "react-router-dom";
import {CONFIG} from "../../helpers/constants/configConstants";
import {handleDelete} from "../../services/serviceFunctions";
import {useAppContext} from "../../context/AppContext";
import {Icon} from "../icons/Icons.jsx";
import {faPenCircle, faCircleXmark} from "@fortawesome/pro-duotone-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


export const AdvancedTools = ({item, name, displayName, data, setData, route, table, imageBucket, showEditButton}) => {

    const editText = LABELS.COMMON.EDIT + " " + displayName;
    const deleteText = LABELS.COMMON.DELETE + " " + displayName;
    const {setInformationMessage, fetchMessages} = useAppContext();

    return (
        <div className={"d-inline-block text-end"}>
            {
                showEditButton &&
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
            }
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
                    onClick={() => {
                        handleDelete(table, item.id, name, setData, data, item.image_filename, imageBucket, setInformationMessage).then(() => {
                            // Update messages after a while.
                            setTimeout(() => {
                                fetchMessages();
                            }, CONFIG.TIMEOUT_XXL);
                        });
                    }}>
                    <Icon icon={faCircleXmark} className={"fa-xl"}/>
                </button>
            </OverlayTrigger>
        </div>
    )
}

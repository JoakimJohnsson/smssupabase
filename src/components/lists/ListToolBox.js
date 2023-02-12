import React from "react";
import {Link} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {handleDelete} from "../serviceFunctions";
import {useAppContext} from "../../context/AppContext";
import {Icon} from "../icons";
import {faPenCircle, faCircleXmark} from "@fortawesome/pro-duotone-svg-icons";


export const ListToolBox = ({item, name, data, setData, showAdminInfo, route, table, imageBucket, isTitle, isIssue}) => {

    const editText = LABELS_AND_HEADINGS.EDIT + " " + name;
    const deleteText = LABELS_AND_HEADINGS.DELETE + " " + name;
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
                (<p>is title</p>)
                :
                (<p>is title</p>)
            :
            <></>
}

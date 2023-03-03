import React, {useState} from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {CustomSpinner} from "../../minis/CustomSpinner";
import {NotAdminIconDuoTone} from "../../icons-duotone";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


export const AddAdminButton = ({user, handleChangeAdmin}) => {

    const [loading, setLoading] = useState(false);

    return (
        <OverlayTrigger
            key={"add-admin-tooltip"}
            placement={"top"}
            overlay={
                <Tooltip id={"add-admin-tooltip"}>
                    {LABELS_AND_HEADINGS.ADD_ADMIN_1 + user.firstname + LABELS_AND_HEADINGS.ADD_ADMIN_2}
                </Tooltip>
            }
        >
            <button
                className={"btn text-danger sms-tool-btn"}
                aria-label={LABELS_AND_HEADINGS.ADD_ADMIN_1 + user.firstname + LABELS_AND_HEADINGS.ADD_ADMIN_2}
                onClick={() => handleChangeAdmin(user.id, 1, setLoading)}>
                {
                    loading ?
                        <CustomSpinner className={"fa-xl"}/>
                        :
                        <NotAdminIconDuoTone className={"fa-xl"}/>
                }
            </button>
        </OverlayTrigger>
    )
}

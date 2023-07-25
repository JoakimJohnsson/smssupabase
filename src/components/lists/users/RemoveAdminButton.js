import React, {useState} from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {CustomSpinner} from "../../minis/CustomSpinner";
import {AdminIconDuoTone} from "../../icons-duotone";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {getUserName} from "../../../helpers/functions/functions";


export const RemoveAdminButton = ({user, handleChangeAdmin}) => {

    const [loading, setLoading] = useState(false);

    return (
        <OverlayTrigger
            key={"remove-admin-tooltip"}
            placement={"top"}
            overlay={
                <Tooltip id={"remove-admin-tooltip"}>
                    {LABELS_AND_HEADINGS.REMOVE_ADMIN_1 + getUserName(user) + LABELS_AND_HEADINGS.REMOVE_ADMIN_2}
                </Tooltip>
            }
        >
            <button
                className={"btn text-success sms-tool-btn"}
                aria-label={LABELS_AND_HEADINGS.REMOVE_ADMIN_1 + getUserName(user) + LABELS_AND_HEADINGS.REMOVE_ADMIN_2}
                onClick={() => handleChangeAdmin(user.id, 0, setLoading)}>
                {
                    loading ?
                        <CustomSpinner className={"fa-xl"}/>
                        :
                        <AdminIconDuoTone className={"fa-xl"}/>
                }
            </button>
        </OverlayTrigger>
    )
}

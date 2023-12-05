import React, {useState} from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {CustomSpinner} from "../../minis/CustomSpinner";
import {NotAdminIconDuoTone} from "../../icons-duotone";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {getUserName} from "../../../helpers/functions";


export const AddAdminButton = ({user, handleChangeAdmin, useTooltip = true}) => {

    const [loading, setLoading] = useState(false);

    return useTooltip ? (
            <OverlayTrigger
                key={"add-admin-tooltip"}
                placement={"top"}
                overlay={
                    <Tooltip id={"add-admin-tooltip"}>
                        {LABELS_AND_HEADINGS.ADD_ADMIN_1 + getUserName(user) + LABELS_AND_HEADINGS.ADD_ADMIN_2}
                    </Tooltip>
                }
            >
                <button
                    className={"btn text-danger sms-tool-btn"}
                    aria-label={LABELS_AND_HEADINGS.ADD_ADMIN_1 + getUserName(user) + LABELS_AND_HEADINGS.ADD_ADMIN_2}
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
        :
        (
            <button
                className={"btn btn-danger mb-3"}
                onClick={() => handleChangeAdmin(user.id, 1, setLoading)}>
                {
                    loading ?
                        <CustomSpinner className={"fa-xl me-2"}/>
                        :
                        <NotAdminIconDuoTone className={"fa-xl me-2"}/>
                }
                {LABELS_AND_HEADINGS.ADD_ADMIN_1 + getUserName(user) + LABELS_AND_HEADINGS.ADD_ADMIN_2}
            </button>
        )
}

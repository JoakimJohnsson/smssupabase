import React, {useState} from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {CustomSpinner} from "../../minis/CustomSpinner";
import {notAdminIconDuoTone} from "../../icons-duotone";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {getUserName} from "../../../helpers/functions";
import {Icon} from "../../icons";
import {FunctionButton} from "../../minis/FunctionButton";


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
                            <Icon icon={notAdminIconDuoTone} className={"fa-xl"}/>
                    }
                </button>
            </OverlayTrigger>
        )
        :
        <FunctionButton
            variant={"danger"}
            customClass={"me-2"}
            icon={notAdminIconDuoTone}
            label={LABELS_AND_HEADINGS.ADD_ADMIN_1 + getUserName(user) + LABELS_AND_HEADINGS.ADD_ADMIN_2}
            onClick={() => handleChangeAdmin(user.id, 1, setLoading)}
        />
}

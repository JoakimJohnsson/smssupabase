import React, {useState} from "react";
import {CustomSpinner} from "../../minis/CustomSpinner";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {getUserName} from "../../../helpers/functions";
import {Icon, notAdminIconDuoTone} from "../../icons/Icons.jsx";
import {FunctionButton} from "../../minis/FunctionButton";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";


export const AddAdminButton = ({user, handleChangeAdmin, useTooltip = true}) => {

    const [loading, setLoading] = useState(false);

    return useTooltip ? (
            <OverlayTrigger
                key={"add-admin-tooltip"}
                placement={"top"}
                overlay={
                    <Tooltip id={"add-admin-tooltip"}>
                        {LABELS.COMMON.ADD_ADMIN_1 + getUserName(user) + LABELS.COMMON.ADD_ADMIN_2}
                    </Tooltip>
                }
            >
                <button
                    className={"btn text-danger sms-tool-btn"}
                    aria-label={LABELS.COMMON.ADD_ADMIN_1 + getUserName(user) + LABELS.COMMON.ADD_ADMIN_2}
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
            variant={"btn-outline-danger"}
            customClass={"me-2"}
            icon={notAdminIconDuoTone}
            label={LABELS.COMMON.ADD_ADMIN_1 + getUserName(user) + LABELS.COMMON.ADD_ADMIN_2}
            onClick={() => handleChangeAdmin(user.id, 1, setLoading)}
        />
}

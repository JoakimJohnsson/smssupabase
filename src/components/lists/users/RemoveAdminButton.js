import React, {useState} from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants/configConstants";
import {CustomSpinner} from "../../minis/CustomSpinner";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {getUserName} from "../../../helpers/functions";
import {Icon, adminIconDuoTone} from "../../icons";
import {FunctionButton} from "../../minis/FunctionButton";


export const RemoveAdminButton = ({user, handleChangeAdmin, useTooltip = true}) => {

    const [loading, setLoading] = useState(false);

    return useTooltip && user ? (
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
                            <Icon icon={adminIconDuoTone} className={"fa-xl"}/>
                    }
                </button>
            </OverlayTrigger>
        )
        :
        <FunctionButton
            variant={"danger"}
            customClass={"me-2"}
            icon={adminIconDuoTone}
            label={LABELS_AND_HEADINGS.REMOVE_ADMIN_1 + getUserName(user) + LABELS_AND_HEADINGS.REMOVE_ADMIN_2}
            onClick={() => handleChangeAdmin(user.id, 0, setLoading)}
        />
}

import React, {useState} from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {CustomSpinner} from "../../minis/CustomSpinner";
import {AdminIconDuoTone} from "../../icons-duotone";


export const RemoveAdminButton = ({user, handleChangeAdmin}) => {

    const [loading, setLoading] = useState(false);

    return (
        <button
            className={"btn text-success sms-tool-btn"}
            aria-label={LABELS_AND_HEADINGS.REMOVE_ADMIN_1 + user.firstname + LABELS_AND_HEADINGS.REMOVE_ADMIN_2}
            onClick={() => handleChangeAdmin(user.id, 0, setLoading)}>
            {
                loading ?
                    <CustomSpinner className={"fa-xl"}/>
                    :
                    <AdminIconDuoTone className={"fa-xl"}/>
            }
        </button>
    )
}

import React, {useEffect} from "react";
import {supabase} from "../../supabase/supabaseClient";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";

const ChangePassword = () => {

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event) => {
            if (event === "PASSWORD_RECOVERY") {
                const newPassword = prompt("What would you like your new password to be?");
                const {data, error} = await supabase.auth
                    .updateUser({password: newPassword})
                if (data) alert("Password updated successfully!")
                if (error) alert("There was an error updating your password.")
            }
        })
    }, [])

    return (
        <div className={"d-flex justify-content-center align-items-center flex-column"}>
            <h1>{LABELS.COMMON.CHANGE_PASSWORD}</h1>
            <a href={"/"}>
                {LABELS.COMMON.BACK}
            </a>
        </div>
    )
}

export default ChangePassword;

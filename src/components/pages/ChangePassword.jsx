import React, {useEffect} from "react";
import {supabase} from "../../supabase/supabaseClient";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";

const ChangePassword = () => {

     useEffect(() => {
        supabase.auth.onAuthStateChange(async (event) => {
            if (event === "PASSWORD_RECOVERY") {
                const newPassword = prompt("What would you like your new password to be?");
                const { data, error } = await supabase.auth
                    .updateUser({ password: newPassword })
                if (data) alert("Password updated successfully!")
                if (error) alert("There was an error updating your password.")
            }
        })
    }, [])

    return (
        <main id="main-content" className={"main-container"}>
            <div className={"row justify-content-center py-5"}>
                <div className={"col-12 col-md-6 text-center"}>
                    <h1 className={"text-primary"}>{LABELS.COMMON.CHANGE_PASSWORD}</h1>
                    <a href={"/"}>
                        {LABELS.COMMON.BACK}
                    </a>
                </div>
            </div>
        </main>
    )
}

export default ChangePassword;

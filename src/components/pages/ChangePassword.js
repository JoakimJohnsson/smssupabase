import React, {useEffect} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {supabase} from "../../supabase/supabaseClient";

const ChangePassword = () => {

     useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
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
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row justify-content-center py-5"}>
                <div className={"col-12 col-md-6 text-center"}>
                    <h1 className={"text-primary"}>{LABELS_AND_HEADINGS.CHANGE_PASSWORD}</h1>
                    <a href={"/"}>
                        {LABELS_AND_HEADINGS.BACK}
                    </a>
                </div>
            </div>
        </main>
    )
}

export default ChangePassword;

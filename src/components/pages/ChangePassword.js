import React from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {StartIconDuoTone} from "../icons-duotone";

const ChangePassword = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row justify-content-center py-5"}>
                <div className={"col-12 col-md-6 d-flex flex-column"}>
                    <h1 className={"text-primary text-center"}>{LABELS_AND_HEADINGS.CHANGE_PASSWORD}</h1>
                    <ChangePasswordForm/>
                    <a href={"/"} className={"btn btn-primary btn-cta d-block d-md-inline-block mb-4"}>
                        <StartIconDuoTone className={"btn-cta--icon"}/>{LABELS_AND_HEADINGS.HOME}
                    </a>
                </div>
            </div>
        </main>
    )
}

export default ChangePassword;

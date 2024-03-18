import React from "react";
import Login from "../Login";
import {Link} from "react-router-dom";
import {LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";

const SignupSuccess = () => {

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row justify-content-center py-5"}>
                <div className={"col-12 col-md-6 d-flex flex-column"}>
                    <div className={"align-self-center mb-4 d-flex align-items-center flex-column w-100"}>
                        <h1 className={"text-primary text-center"}>{LABELS_AND_HEADINGS.SIGN_UP_SUCCESS}</h1>
                        <p className={"lead mb-4"}>{TEXTS.SIGN_UP_SUCCESS_TEXT}</p>
                        <Login/>
                    </div>
                    <Link to="/" className={"btn btn-primary btn-cta mb-5"}>
                    {LABELS.COMMON.BACK}
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default SignupSuccess;

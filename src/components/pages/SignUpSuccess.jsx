import React from "react";
import Login from "./home/Login";
import {Link} from "react-router-dom";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


const SignupSuccess = () => {

    return (
        <div className={"row justify-content-center py-5"}>
            <div className={"col-12 col-md-6 d-flex flex-column"}>
                <div className={"align-self-center mb-4 d-flex align-items-center flex-column w-100"}>
                    <h1 className={"text-primary text-center"}>{LABELS.COMMON.SIGN_UP_SUCCESS}</h1>
                    <Login/>
                </div>
                <Link to="/" className={"btn btn-primary btn-cta mb-5"}>
                    {LABELS.COMMON.BACK}
                </Link>
            </div>
        </div>
    )
}

export default SignupSuccess;

import React from "react";
import Login from "../Login";
import {BadgeCheckIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";

const SignupSuccess = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row justify-content-center py-5"}>
                <div className={"col-12 col-md-6 d-flex flex-column"}>
                    <div className={"align-self-center mb-4 d-flex align-items-center flex-column w-100"}>
                        <h2 className={"fs-1 text-primary"}>Grattis!</h2>
                        <p className={"lead mb-4"}>Nu kan du logga in.</p>
                        <BadgeCheckIcon className="sms-icon--large text-info"/>
                        <Login/>
                    </div>
                    <Link to="/" className={"btn btn-secondary btn-lg mb-5"}>
                        TILLBAKA
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default SignupSuccess;

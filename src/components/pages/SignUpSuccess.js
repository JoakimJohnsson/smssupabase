import React from "react";
import Login from "../Login";
import {Link} from "react-router-dom";

const SignupSuccess = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row justify-content-center py-5"}>
                <div className={"col-12 col-md-6 d-flex flex-column"}>
                    <div className={"align-self-center mb-4 d-flex align-items-center flex-column w-100"}>
                        <h1 className={"text-primary text-center"}>Registreringen lyckades!</h1>
                        <p className={"lead mb-4"}>Nu kan du logga in.</p>
                        <Login/>
                    </div>
                    <Link to="/" className={"btn btn-primary btn-cta mb-5"}>
                        TILLBAKA
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default SignupSuccess;

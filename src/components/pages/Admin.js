import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";

const Admin = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12"}>
                    <h1>{LABELS_AND_HEADINGS.ADMIN}</h1>
                </div>
                <div className={'col-12 col-md-4'}>
                <div className={'dashboard-card'}>
                    <h2>{LABELS_AND_HEADINGS.FORMAT}</h2>
                    <p>Det finns ett antal olika format att välja på.</p>
                </div>
                </div>
            </div>
        </main>
    )
}

export default Admin;

import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";

const Admin = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12"}>
                    <h1 className={""}>
                        {LABELS_AND_HEADINGS.ADMIN}
                    </h1>
                </div>
            </div>
        </main>
    )
}

export default Admin;

import React from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {AdminH1} from "../../headings";


export const AdminPublisherEdit = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={LABELS_AND_HEADINGS.ADD_PUBLISHER}/>
                    <div className={'row'}>
                        <div className={'sms-dashboard-col'}>
                            <div className={'sms-form'}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

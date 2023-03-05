import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {getRowsByTable} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {PublishersList} from "../lists/publishers/PublishersList";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";


export const Publishers = () => {

    const [loading, setLoading] = useState(true);
    const [publishersData, setPublishersData] = useState(null);

    useEffect(() => {
        getRowsByTable("publishers", setPublishersData).then(() => setLoading(false));
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col--full"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_PUBLISHERS}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <div className={"sms-section--light"}>
                                <PublishersList publishersData={publishersData} showAdminInfo={false}/>
                            </div>
                    }
                </div>
            </div>
        </main>
    )
}

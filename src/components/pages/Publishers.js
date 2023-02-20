import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Spinner} from "../minis/Spinner";
import {getRowsByTable} from "../serviceFunctions";
import {PublishersList} from "../lists/publishers/PublishersList";
import {HeadingWithBreadCrumbs} from "../headings";


export const Publishers = () => {

    const [loading, setLoading] = useState(true);
    const [publishersData, setPublishersData] = useState(null);

    useEffect(() => {
        getRowsByTable("publishers", setPublishersData).then(() => setLoading(false));
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_PUBLISHERS}/>
                    {
                        loading ?
                            <Spinner size={"4x"}/>
                            :
                            <PublishersList publishersData={publishersData} showAdminInfo={false}/>
                    }
                </div>
            </div>
        </main>
    )
}

import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Spinner} from "../minis/Spinner";
import {getRowsByTable} from "../serviceFunctions";
import {PublishersList} from "../lists/publishers/PublishersList";
import {HeadingWithBreadCrumbs} from "../headings";


export const Publishers = () => {

    const [publishersData, setPublishersData] = useState(null);

    useEffect(() => {
        getRowsByTable("publishers", setPublishersData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 row-padding--main"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_PUBLISHERS}/>
                    {
                        publishersData ?
                            <PublishersList publishersData={publishersData} showAdminInfo={false}/>
                            :
                            <Spinner/>
                    }
                </div>
            </div>
        </main>
    )
}

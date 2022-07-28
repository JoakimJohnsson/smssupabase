import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TEXTS} from "../../../../helpers/constants";
import {DocumentDuplicateIcon} from "@heroicons/react/solid";
import {Link, useNavigate} from "react-router-dom";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../serviceFunctions";
import {NoDataAvailable} from "../../../miniComponents/NoDataAvailable";
import {PublishersList} from "../../../listComponents/publishers/PublishersList";


export const PublishersCard = () => {

    const [limitedPublishersData, setLimitedPublishersData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn('publishers', 'created_at', setLimitedPublishersData, 5, false).then()
    }, [])

    return (
        <div className={'sms-dashboard-col'}>
            <div className={'dashboard-card'}>
                <h2><DocumentDuplicateIcon className={'sms-icon--text-lg me-2'}/>{LABELS_AND_HEADINGS.PUBLISHERS}</h2>
                {
                    limitedPublishersData ?
                        <>
                            <p>
                                {TEXTS.SHOWING_LATEST_PUBLISHERS}
                            </p>
                            <PublishersList titlesData={limitedPublishersData} setTitlesData={setLimitedPublishersData} showAdminInfo={true}/>
                        </>
                        :
                        <NoDataAvailable />
                }
                <button className={'btn btn-primary me-3 mb-2'}
                        onClick={() => navigate(ROUTES.ADMIN.PUBLISHER_ADD)}>{LABELS_AND_HEADINGS.ADD_PUBLISHER}
                </button>
                <Link className={'btn btn-outline-secondary mb-2'} to={ROUTES.ADMIN.PUBLISHERS}>{LABELS_AND_HEADINGS.SEE_ALL_PUBLISHERS}</Link>
            </div>
        </div>
    )
}

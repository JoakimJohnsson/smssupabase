import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TEXTS} from "../../../../helpers/constants";
import {DocumentDuplicateIcon} from "@heroicons/react/solid";
import {Link, useNavigate} from "react-router-dom";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../serviceFunctions";
import {TitlesList} from "../../../listComponents/titles/TitlesList";
import {NoDataAvailable} from "../../../miniComponents/NoDataAvailable";


export const PublishersCard = () => {

    const [limitedTitlesData, setLimitedTitlesData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn('titles', 'created_at', setLimitedTitlesData, 5, false).then()
    }, [])

    return (
        <div className={'sms-dashboard-col'}>
            <div className={'dashboard-card'}>
                <h2><DocumentDuplicateIcon className={'sms-icon--text-lg me-2'}/>{LABELS_AND_HEADINGS.PUBLISHERS}</h2>
                {
                    limitedTitlesData ?
                        <>
                            <p>
                                {TEXTS.SHOWING_LATEST_PUBLISHERS}
                            </p>
                            <TitlesList titlesData={limitedTitlesData} setTitlesData={setLimitedTitlesData} showAdminInfo={true}/>
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

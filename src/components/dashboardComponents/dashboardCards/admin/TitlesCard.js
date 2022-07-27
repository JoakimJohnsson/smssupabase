import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TEXTS} from "../../../../helpers/constants";
import {DocumentDuplicateIcon} from "@heroicons/react/solid";
import {Link, useNavigate} from "react-router-dom";
import {toAddTitlesPage} from "../../../navigation/navFunctions";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../serviceFunctions";
import {TitlesList} from "../../../listComponents/titles/TitlesList";
import {NoDataAvailable} from "../../../miniComponents/NoDataAvailable";


export const TitlesCard = () => {

    const [limitedTitlesData, setLimitedTitlesData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn('titles', 'created_at', setLimitedTitlesData, 5, false).then()
    }, [])

    return (
        <div className={'sms-dashboard-col'}>
            <div className={'dashboard-card'}>
                <h2><DocumentDuplicateIcon className={'sms-icon--text-lg me-2'}/>{LABELS_AND_HEADINGS.TITLES}</h2>
                {
                    limitedTitlesData ?
                        <>
                            <p>
                                {TEXTS.SHOWING_LATEST_TITLES}
                            </p>
                            <TitlesList titlesData={limitedTitlesData} setTitlesData={setLimitedTitlesData} showAdminInfo={true}/>
                        </>
                        :
                        <NoDataAvailable />
                }
                <button className={'btn btn-primary me-3 mb-2'}
                        onClick={() => toAddTitlesPage(navigate)}>{LABELS_AND_HEADINGS.ADD_TITLE}
                </button>
                <Link className={'btn btn-outline-secondary mb-2'} to={ROUTES.ADMIN.TITLES}>{LABELS_AND_HEADINGS.SEE_ALL_TITLES}</Link>
            </div>
        </div>
    )
}

import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import FilterForm from "../search-filter/FilterForm";
import {IssueCard} from "../lists/issues/IssueCard";
import {getAllIssuesWithTitlesAndPublishers} from "../../helpers/functions/serviceFunctions/issueFunctions";
import {sortByName} from "../../helpers/functions/functions";
import {useSearchFilter} from "../../helpers/customHooks/useSearchFilter";


export const Issues = () => {

    const [loading, setLoading] = useState(true);
    const [issuesData, setIssuesData] = useState(null);
    const [searchParams, setSearchParams, filter] = useSearchFilter();


    useEffect(() => {
        getAllIssuesWithTitlesAndPublishers(setIssuesData).then(() => setLoading(false));
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_ISSUES}/>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-page-col"}>
                    <FilterForm filter={filter} searchParams={searchParams} setSearchParams={setSearchParams}
                                placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_PUBLISHER_OR_YEAR}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    issuesData
                                        .filter(issue => issue.titles.name.toLowerCase()
                                                .includes(filter.toLowerCase()) ||
                                            issue.titles.publishers.name.toLowerCase()
                                                .includes(filter.toLowerCase()) ||
                                            issue.year.toString().toLowerCase()
                                                .includes(filter.toLowerCase()) ||
                                            filter === ""
                                        )
                                        .sort((a, b) => sortByName(a.titles, b.titles))
                                        .map(issue =>
                                            <IssueCard key={issue.id} issue={issue}/>
                                        )
                                }
                            </ul>
                    }
                </div>
            </div>
        </main>
    )
}

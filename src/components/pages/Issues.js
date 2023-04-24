import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {useSearchParams} from "react-router-dom";
import FilterForm from "../search-filter/FilterForm";
import {IssueCard} from "../lists/issues/IssueCard";
import {getAllIssues} from "../../helpers/functions/serviceFunctions/issueFunctions";
import {sortByName} from "../../helpers/functions/functions";


export const Issues = () => {

    const [loading, setLoading] = useState(true);
    const [issuesData, setIssuesData] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams({filter: ""});
    const filter = searchParams.get("filter");


    useEffect(() => {
        getAllIssues(setIssuesData).then(() => setLoading(false));
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
                                placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_OR_YEAR}/>

                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    issuesData
                                        .filter(issue => issue.titles.name.toLowerCase()
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

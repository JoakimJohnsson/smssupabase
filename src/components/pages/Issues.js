import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import FilterFormSimple from "../search-filter/FilterFormSimple";
import {IssueCard} from "../lists/issues/IssueCard";
import {getAllIssuesWithTitleAndPublisher} from "../../helpers/functions/serviceFunctions/issueFunctions";
import {sortByName} from "../../helpers/functions/functions";
import {useSimpleQueryFilter} from "../../helpers/customHooks/useSimpleQueryFilter";


export const Issues = () => {

    const [loading, setLoading] = useState(true);
    const [issuesData, setIssuesData] = useState(null);
    const [setSearchParams, query] = useSimpleQueryFilter();

    useEffect(() => {
        getAllIssuesWithTitleAndPublisher(setIssuesData).then(() => setLoading(false));
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_ISSUES}/>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_OR_YEAR}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    query ?
                                        issuesData
                                            .filter(issue => issue.titles.name.toLowerCase()
                                                    .includes(query.toLowerCase()) ||
                                                issue.publishers.name.toLowerCase()
                                                    .includes(query.toLowerCase()) ||
                                                issue.year.toString().toLowerCase()
                                                    .includes(query.toLowerCase()) ||
                                                query === ""
                                            )
                                            .sort((a, b) => sortByName(a.titles, b.titles))
                                            .map(issue =>
                                                <IssueCard key={issue.id} issue={issue}/>
                                            )
                                        :
                                        issuesData.map(issue =>
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

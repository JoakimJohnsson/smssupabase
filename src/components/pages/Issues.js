import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import FilterFormSimple from "../search-filter/FilterFormSimple";
import {getAllIssuesWithTitleAndPublisher} from "../../services/issueService";
import {filterQueryIssueByTitleNamePublisherNameYearAndSource, sortByName} from "../../helpers/functions";
import {useSimpleQueryFilter} from "../../helpers/customHooks/useSimpleQueryFilter";
import {IssueLinkCard} from "../lists/issues/IssueLinkCard";


export const Issues = () => {

    const [loading, setLoading] = useState(true);
    const [issuesData, setIssuesData] = useState(null);
    const {setSearchParams, query} = useSimpleQueryFilter();

    useEffect(() => {
        getAllIssuesWithTitleAndPublisher(setIssuesData).then(() => setLoading(false));
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_ISSUES}/>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_PUBLISHER_YEAR_OR_SOURCE}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    query ?
                                        issuesData
                                            .filter((issue) => {
                                                return (
                                                    filterQueryIssueByTitleNamePublisherNameYearAndSource(issue, query)
                                                )
                                            })
                                            .sort((a, b) => sortByName(a.titles, b.titles))
                                            .map((issue, index) =>
                                                <IssueLinkCard key={issue.id} issue={issue} index={index}/>
                                            )
                                        :
                                        issuesData
                                            .sort((a, b) => sortByName(a.titles, b.titles))
                                            .map((issue, index) =>
                                            <IssueLinkCard key={issue.id} issue={issue} index={index}/>
                                        )
                                }
                            </ul>
                    }
                </div>
            </div>
        </main>
    )
}

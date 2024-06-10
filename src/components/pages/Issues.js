import React, {useEffect, useState} from "react";
import {CONFIG, LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants/configConstants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import FilterFormSimple from "../search-filter/FilterFormSimple";
import {getAllIssuesWithTitleAndPublisher} from "../../services/issueService";
import {filterQueryIssueByTitleNamePublisherNameYearAndSource, sortByName} from "../../helpers/functions";
import {useSimpleQueryFilter} from "../../helpers/customHooks/useSimpleQueryFilter";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {IssueCard} from "../lists/issues/IssueCard";
import {LazyTextPlaceholder} from "../minis/LazyTextPlaceholder";
import {ShowMoreButtons} from "../minis/ShowMoreButtons";


export const Issues = () => {

    const [loading, setLoading] = useState(true);
    const [issuesData, setIssuesData] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(CONFIG.PAGINATION_ITEM_COUNT);
    const {setSearchParams, query} = useSimpleQueryFilter();

    useEffect(() => {
        getAllIssuesWithTitleAndPublisher(setIssuesData).then(() => setLoading(false));
    }, []);

    const filteredData = issuesData
        .sort((a, b) => sortByName(a.titles, b.titles))
        .filter(issue => {
            return (
                filterQueryIssueByTitleNamePublisherNameYearAndSource(issue, query)
            )
        }
    );

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS.SECTIONS.ISSUES.ALL_ISSUES}/>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams}
                                      placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_PUBLISHER_YEAR_OR_SOURCE}/>
                    <p className={"text-uppercase fs-large placeholder-glow"}>
                        {TEXTS.SHOWING} <span className={"fw-bolder"}>
                        {
                            filteredData && filteredData.length ?
                                itemsToShow < filteredData.length ?
                                    itemsToShow
                                    :
                                    filteredData.length
                                :
                                <LazyTextPlaceholder charCount={2}/>
                        }
                        </span> {TEXTS.SHOWING_OF} {filteredData ? filteredData.length :
                        <LazyTextPlaceholder charCount={3}/>} {LABELS.SECTIONS.ISSUES.ISSUES}
                    </p>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    filteredData.slice(0, itemsToShow)
                                        .map(issue => (
                                            <IssueCard key={issue.id} issue={issue}/>
                                        ))
                                }
                            </ul>
                    }
                    {
                        filteredData.length > CONFIG.PAGINATION_ITEM_COUNT &&
                        <p className={"text-uppercase fs-large placeholder-glow"}>
                            {TEXTS.SHOWING} <span className={"fw-bolder"}>
                        {
                            filteredData && filteredData.length ?
                                itemsToShow < filteredData.length ?
                                    itemsToShow
                                    :
                                    filteredData.length
                                :
                                <LazyTextPlaceholder charCount={2}/>
                        }
                        </span> {TEXTS.SHOWING_OF} {filteredData ? filteredData.length :
                            <LazyTextPlaceholder charCount={3}/>} {LABELS.SECTIONS.ISSUES.ISSUES}
                        </p>
                    }
                    <ShowMoreButtons data={filteredData} setItemsToShow={setItemsToShow} itemsToShow={itemsToShow}/>
                </div>
            </div>
        </main>
    )
}

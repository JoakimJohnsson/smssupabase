import React, {useState, useEffect} from "react";
import {PANES, TEXTS} from "../../../../helpers/constants/textConstants/texts.js";
import {useAppContext} from "../../../../context/AppContext.jsx";
import {HeadingWithBreadCrumbs} from "../../../headings/index.jsx";
import {OverlaySpinner} from "../../../minis/OverlaySpinner.jsx";
import {getUserIssues} from "../../../../helpers/databaseFunctions.js";
import {filterQueryIssueByTitleNamePublisherNameYearAndSource, sortByName} from "../../../../helpers/functions.jsx";
import {useSimpleQueryFilter} from "../../../../helpers/customHooks/useSimpleQueryFilter.js";
import {CONFIG} from "../../../../helpers/constants/configConstants.jsx";
import FilterFormSimple from "../../../searchFilter/FilterFormSimple.jsx";
import {LazyTextPlaceholder} from "../../../minis/LazyTextPlaceholder.jsx";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings.js";
import {ShowMoreButtons} from "../../../minis/ShowMoreButtons.jsx";
import {IssueLinkCard} from "../../../lists/issues/IssueLinkCard.jsx";


export const MyIssuesPane = () => {

    const [loading, setLoading] = useState(true);
    const [itemsToShow, setItemsToShow] = useState(CONFIG.PAGINATION_ITEM_COUNT);
    const [issuesData, setIssuesData] = useState(null);
    const {setSearchParams, query} = useSimpleQueryFilter();
    const {user} = useAppContext();

    useEffect(() => {
        const fetchIssues = async () => {
            const result = await getUserIssues(user.id);
            if (result) {
                if (result.data) {
                    setIssuesData(result.data);
                }
            }
        };
        fetchIssues().then(() => setLoading(false));
    }, [user.id]);

    const filteredData = issuesData?.sort((a, b) => sortByName(a.titles, b.titles))
        .filter(issue => {
                return (
                    filterQueryIssueByTitleNamePublisherNameYearAndSource(issue, query)
                )
            }
        );

    return (
        <div className={"sms-page-col"}>
            <HeadingWithBreadCrumbs text={PANES.ISSUES.NAME}/>
            <FilterFormSimple query={query} setSearchParams={setSearchParams}
                              placeholder={TEXTS.FILTER_TITLE_PUBLISHER_YEAR_OR_SOURCE}/>
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
                                    <IssueLinkCard key={issue.id} issue={issue}/>
                                ))
                        }
                    </ul>
            }
            {
                filteredData && filteredData.length > CONFIG.PAGINATION_ITEM_COUNT &&
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
    )
}

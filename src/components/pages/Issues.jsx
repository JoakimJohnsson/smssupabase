import React from "react";
import {CONFIG} from "../../helpers/constants/configConstants";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import FilterFormSimple from "../searchFilter/FilterFormSimple";
import {IssueCard} from "../lists/issues/IssueCard";
import {LazyTextPlaceholder} from "../minis/LazyTextPlaceholder";
import {ShowMoreButtons} from "../minis/ShowMoreButtons";
import {useShowMoreFilteredData} from "../../helpers/customHooks/useShowMoreFilteredData";


export const Issues = () => {

    const {query, setSearchParams, filteredData, itemsToShow, setItemsToShow, loading} = useShowMoreFilteredData();

    return (
        <div className={"sms-page-col"}>
            <HeadingWithBreadCrumbs text={LABELS.SECTIONS.ISSUES.ALL_ISSUES}/>
            <FilterFormSimple query={query} setSearchParams={setSearchParams}
                              placeholder={TEXTS.FILTER_TITLE_PUBLISHER_YEAR_OR_SOURCE}/>
            <p className={"text-uppercase fs-large placeholder-glow"}>
                {TEXTS.SHOWING} <span className={"fw-bolder"}>
                        {
                            filteredData && filteredData.length >= 0 ?
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
    )
}

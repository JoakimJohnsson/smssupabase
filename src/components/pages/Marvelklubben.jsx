import React, {useEffect, useState} from "react";
import {CONFIG} from "../../helpers/constants/configConstants";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {HeadingWithBreadcrumbs} from "../headings/HeadingWithBreadcrumbs.jsx";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {getAllMarvelklubbenIssues} from "../../services/issueService";
import {IssueCard} from "../lists/issues/IssueCard";
import FilterFormSimple from "../searchFilter/FilterFormSimple";
import {useSimpleQueryFilter} from "../../helpers/customHooks/useSimpleQueryFilter";
import {LazyTextPlaceholder} from "../minis/LazyTextPlaceholder";
import {ShowMoreButtons} from "../minis/ShowMoreButtons";
import {SmsListWithCards} from "./pagecomponents/SmsListWithCards.jsx";


export const Marvelklubben = () => {

    const [loading, setLoading] = useState(true);
    const [marvelKlubbenData, setMarvelKlubbenData] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(CONFIG.PAGINATION_ITEM_COUNT);
    const {setSearchParams, query} = useSimpleQueryFilter();

    useEffect(() => {
        getAllMarvelklubbenIssues(setMarvelKlubbenData).then(() => setLoading(false));
    }, []);

    const filteredData = marvelKlubbenData.filter(issue =>
        issue.titles.name.toLowerCase().includes(query.toLowerCase()) ||
        issue.marvelklubben_number.toString().toLowerCase().includes(query.toLowerCase()) ||
        issue.year.toString().toLowerCase().includes(query.toLowerCase()) ||
        query === ""
    );

    return (
        <div className="sms-page-col">
            <HeadingWithBreadcrumbs text={LABELS.SECTIONS.MARVELKLUBBEN.MARVELKLUBBEN}/>
            <p className="lead">{TEXTS.MARVELKLUBBEN_LEAD}</p>
            <p>{TEXTS.MARVELKLUBBEN_TEXT_1}</p>
            <p>{TEXTS.MARVELKLUBBEN_TEXT_2} <a href="https://sv.wikipedia.org/wiki/Marvelklubben" rel="noreferrer"
                                               target="_blank">Wikipedia</a>.</p>
            <FilterFormSimple query={query} setSearchParams={setSearchParams}
                              placeholder={TEXTS.FILTER_NUMBER_TITLE_OR_YEAR}/>
            <p className={"text-uppercase fs-large placeholder-glow"}>
                {TEXTS.SHOWING} <span className={"fw-bolder"}>
                        {
                            filteredData ?
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
            {loading ?
                <OverlaySpinner/>
                :
                <SmsListWithCards>
                    {
                        filteredData.slice(0, itemsToShow).map(issue => (
                            <IssueCard key={issue.id} issue={issue}/>
                        ))
                    }
                </SmsListWithCards>
            }
            {
                filteredData.length > CONFIG.PAGINATION_ITEM_COUNT &&
                <p className={"text-uppercase fs-large placeholder-glow"}>
                    {TEXTS.SHOWING} <span className={"fw-bolder"}>
                        {
                            filteredData ?
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
    );
};

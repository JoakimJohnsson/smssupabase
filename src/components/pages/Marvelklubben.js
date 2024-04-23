import React, {useEffect, useState} from "react";
import {CONFIG, LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants/configConstants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {getAllMarvelklubbenIssues} from "../../services/issueService";
import {IssueCard} from "../lists/issues/IssueCard";
import FilterFormSimple from "../search-filter/FilterFormSimple";
import {useSimpleQueryFilter} from "../../helpers/customHooks/useSimpleQueryFilter";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {LazyTextPlaceholder} from "../minis/LazyTextPlaceholder";
import {ShowMoreButtons} from "../minis/ShowMoreButtons";


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
        <main id="main-content" className="container-fluid main-container">
            <div className="row row-padding--main">
                <div className="sms-page-col">
                    <HeadingWithBreadCrumbs text={LABELS.SECTIONS.MARVELKLUBBEN.MARVELKLUBBEN}/>
                    <p className="lead">{TEXTS.MARVELKLUBBEN_LEAD}</p>
                    <p>{TEXTS.MARVELKLUBBEN_TEXT_1}</p>
                    <p>{TEXTS.MARVELKLUBBEN_TEXT_2} <a href="https://sv.wikipedia.org/wiki/Marvelklubben" rel="noreferrer"
                                                       target="_blank">Wikipedia</a>.</p>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={LABELS_AND_HEADINGS.FILTER_NUMBER_TITLE_OR_YEAR}/>
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
                        <ul className="sms-list--with-cards">
                            {
                                filteredData.slice(0, itemsToShow).map(issue => (
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
            </div>
        </main>
    );
};
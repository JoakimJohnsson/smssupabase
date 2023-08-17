import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {getAllMarvelklubbenIssues} from "../../helpers/functions/serviceFunctions/issueFunctions";
import {IssueCard} from "../lists/issues/IssueCard";
import FilterFormSimple from "../search-filter/FilterFormSimple";
import {useSearchFilter} from "../../helpers/customHooks/useSearchFilter";


export const Marvelklubben = () => {

    const [loading, setLoading] = useState(true);
    const [marvelKlubbenData, setMarvelKlubbenData] = useState(null);
    const [searchParams, setSearchParams, filterQuery] = useSearchFilter();

    useEffect(() => {
        getAllMarvelklubbenIssues(setMarvelKlubbenData).then(() => setLoading(false));
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.MARVELKLUBBEN}/>
                    <p className={"lead"}>{TEXTS.MARVELKLUBBEN_LEAD}</p>
                    <p>{TEXTS.MARVELKLUBBEN_TEXT_1}</p>
                    <p>{TEXTS.MARVELKLUBBEN_TEXT_2} <a href="https://sv.wikipedia.org/wiki/Marvelklubben" rel="noreferrer"
                                                       target={"_blank"}>Wikipedia</a>.</p>
                    <FilterFormSimple filterQuery={filterQuery} searchParams={searchParams} setSearchParams={setSearchParams}
                                      placeholder={LABELS_AND_HEADINGS.FILTER_NUMBER_TITLE_OR_YEAR}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    marvelKlubbenData
                                        .filter(issue => issue.titles.name.toLowerCase()
                                                .includes(filterQuery.toLowerCase()) ||
                                            issue.marvelklubben_number.toString().toLowerCase()
                                                .includes(filterQuery.toLowerCase()) ||
                                            issue.year.toString().toLowerCase()
                                                .includes(filterQuery.toLowerCase()) ||
                                            filterQuery === "")
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

import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {getAllMarvelklubbenIssues} from "../../helpers/functions/serviceFunctions/issueFunctions";
import {IssueCard} from "../lists/issues/IssueCard";
import FilterFormSimple from "../search-filter/FilterFormSimple";
import {useSimpleQueryFilter} from "../../helpers/customHooks/useSimpleQueryFilter";


export const Marvelklubben = () => {

    const [loading, setLoading] = useState(true);
    const [marvelKlubbenData, setMarvelKlubbenData] = useState(null);
    const [setSearchParams, query] = useSimpleQueryFilter();

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
                    <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={LABELS_AND_HEADINGS.FILTER_NUMBER_TITLE_OR_YEAR}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    query ?
                                        marvelKlubbenData
                                            .filter(issue => issue.titles.name.toLowerCase()
                                                    .includes(query.toLowerCase()) ||
                                                issue.marvelklubben_number.toString().toLowerCase()
                                                    .includes(query.toLowerCase()) ||
                                                issue.year.toString().toLowerCase()
                                                    .includes(query.toLowerCase()) ||
                                                query === "")
                                            .map(issue =>
                                                <IssueCard key={issue.id} issue={issue}/>
                                            )
                                        :
                                        marvelKlubbenData.map(issue =>
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

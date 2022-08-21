import React, {useState} from "react";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {Link} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {getNameByTableAndId} from "../serviceFunctions";


export const Breadcrumbs = () => {

    // Todo Använda en useeffect istället - och använda state breadCrumbName, setBreadCrumbName
    // Todo istället för get translatedBreadCrumbname direkt i rendern

    const [fetchedName, setFetchedName] = useState("");
    let previousCrumb = "";
    const breadcrumbs = useBreadcrumbs();
    const size = breadcrumbs ? breadcrumbs.length - 1 : 0;

    const updatePreviousCrumb = (breadcrumb) => {
        previousCrumb = breadcrumb.props.children.toString().toLowerCase();
    }

    const getTranslatedBreadCrumbName = (breadcrumb) => {
        const breadCrumbName = breadcrumb.props.children.toString().toLowerCase();
        let id = "";
        if (breadCrumbName.length > 30 ) {
            id = breadCrumbName.replaceAll(' ', '-');
            getNameByTableAndId(previousCrumb, id, setFetchedName).then();
        }

        if ((fetchedName !== "") && (previousCrumb === 'titles' || previousCrumb === 'publishers')) {
            updatePreviousCrumb(breadcrumb);
            return fetchedName;
        } else {
            switch (breadCrumbName) {
                case "home":
                    updatePreviousCrumb(breadcrumb);
                    return LABELS_AND_HEADINGS.HOME;
                case "admin":
                    updatePreviousCrumb(breadcrumb);
                    return LABELS_AND_HEADINGS.ADMIN;
                case "titles":
                    updatePreviousCrumb(breadcrumb);
                    return LABELS_AND_HEADINGS.ALL_TITLES;
                case "publishers":
                    updatePreviousCrumb(breadcrumb);
                    return LABELS_AND_HEADINGS.ALL_PUBLISHERS;
                case "edit":
                    updatePreviousCrumb(breadcrumb);
                    return LABELS_AND_HEADINGS.EDIT;
                default:
                    updatePreviousCrumb(breadcrumb);
                    return breadCrumbName;
            }
        }
    }

    const printBreadCrumbLinkItems = (index, breadcrumb, match) => {
        if (index === size) {
            return (
                <li className={"breadcrumb-item active"} aria-current={"page"} key={index}>
                    {getTranslatedBreadCrumbName(breadcrumb)}
                </li>
            )
        } else {
            return (
                <li className={"breadcrumb-item"} key={index}>
                    <Link to={match.pathname}>{getTranslatedBreadCrumbName(breadcrumb)}</Link>
                </li>
            )
        }
    }

    return (
        <nav aria-label="breadcrumb" className={"mb-5"}>
            <ol className="breadcrumb small">
                {breadcrumbs.map(({match, breadcrumb}, index) => {
                        return printBreadCrumbLinkItems(index, breadcrumb, match);
                    }
                )}
            </ol>
        </nav>
    );
}
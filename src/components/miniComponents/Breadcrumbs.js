import React, {useState} from "react";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {Link, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {getNameByTableAndId} from "../serviceFunctions";


export const Breadcrumbs = () => {

    const {id} = useParams();
    const [fetchedName, setFetchedName] = useState("");
    let previousCrumb = "";
    const breadcrumbs = useBreadcrumbs();
    const size = breadcrumbs ? breadcrumbs.length - 1 : 0;

    const updatePreviousCrumb = (breadcrumb) => {
        previousCrumb = breadcrumb.props.children.toString().toLowerCase();
    }

    const getTranslatedBreadcrumbName = (breadcrumbName, breadcrumb) => {
        updatePreviousCrumb(breadcrumb);
        switch (breadcrumbName) {
            case "home":
                return LABELS_AND_HEADINGS.HOME;
            case "admin":
                return LABELS_AND_HEADINGS.ADMIN;
            case "titles":
                return LABELS_AND_HEADINGS.ALL_TITLES;
            case "publishers":
                return LABELS_AND_HEADINGS.ALL_PUBLISHERS;
            case "edit":
                return LABELS_AND_HEADINGS.EDIT;
            default:
                return breadcrumbName;
        }
    }

    const getBreadcrumbName = (breadcrumb) => {
        const breadcrumbName = breadcrumb.props.children.toString().toLowerCase();
        if (id && breadcrumbName.length > 30) {
            getNameByTableAndId(previousCrumb, id, setFetchedName).then();
        }
        if ((fetchedName !== "") && (previousCrumb === TABLES.TITLES || previousCrumb === TABLES.PUBLISHERS)) {
            updatePreviousCrumb(breadcrumb);
            return fetchedName;
        } else {
            return getTranslatedBreadcrumbName(breadcrumbName, breadcrumb);
        }
    }

    const printBreadCrumbLinkItems = (index, breadcrumb, match) => {
        if (index === size) {
            return (
                <li className={"breadcrumb-item active"} aria-current={"page"} key={index}>
                    {getBreadcrumbName(breadcrumb)}
                </li>
            )
        } else {
            return (
                <li className={"breadcrumb-item"} key={index}>
                    <Link to={match.pathname}>{getBreadcrumbName(breadcrumb)}</Link>
                </li>
            )
        }
    }

    return (
        <nav aria-label={LABELS_AND_HEADINGS.BREADCRUMB} className={"mb-5 breadcrumb-nav hide"}>
            <ol className="breadcrumb small">
                {breadcrumbs.map(({match, breadcrumb}, index) => {
                        return printBreadCrumbLinkItems(index, breadcrumb, match);
                    }
                )}
            </ol>
        </nav>
    );
}
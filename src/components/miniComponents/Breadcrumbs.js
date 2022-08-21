import React, {useState} from "react";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {Link, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
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
        switch (breadcrumbName) {
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
                return breadcrumbName;
        }
    }

    const getBreadcrumbName = (breadcrumb) => {
        const breadcrumbName = breadcrumb.props.children.toString().toLowerCase();
        if (id && breadcrumbName.length > 30) {
            getNameByTableAndId(previousCrumb, id, setFetchedName).then();
        }
        if ((fetchedName !== "") && (previousCrumb === 'titles' || previousCrumb === 'publishers')) {
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
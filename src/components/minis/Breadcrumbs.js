import React, {useState} from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {Link, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS, PANES, TABLES} from "../../helpers/constants";
import {getNameByTableAndId, getStartYearByTableAndId} from "../../services/serviceFunctions";


export const Breadcrumbs = ({doIgnoreName, bcName}) => {

    const {id} = useParams();
    const [fetchedName, setFetchedName] = useState("");
    const [fetchedStartYear, setFetchedStartYear] = useState("");
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
            case "dashboard":
                return LABELS_AND_HEADINGS.DASHBOARD;
            case "profile":
                return LABELS_AND_HEADINGS.SETTINGS;
            case "titles":
                return LABELS_AND_HEADINGS.ALL_TITLES;
            case "my titles":
                return PANES.TITLES.NAME;
            case "marvel club":
                return LABELS_AND_HEADINGS.MARVELKLUBBEN;
            case "publishers":
                return LABELS_AND_HEADINGS.ALL_PUBLISHERS;
            case "users":
                return LABELS_AND_HEADINGS.ALL_USERS;
            case "edit":
                return LABELS_AND_HEADINGS.EDIT;
            case "issues":
                return LABELS_AND_HEADINGS.ISSUES;
            case "valuation":
                return PANES.VALUATION.NAME;
            case "overview":
                return PANES.OVERVIEW.NAME;
            case "other collections":
                return PANES.OTHER_COLLECTIONS.NAME;
            case "grade values":
                return LABELS_AND_HEADINGS.GRADE_VALUES;
            case "messages":
                return LABELS_AND_HEADINGS.MESSAGES;
            case "add":
                return LABELS_AND_HEADINGS.ADD;
            default:
                return breadcrumbName;
        }
    }

    const getNameFromBreadcrumbName = (breadcrumbName, breadcrumb) => {
        if (id && breadcrumbName.length > 30 && previousCrumb !== "users") {
            getNameByTableAndId(previousCrumb, id, setFetchedName).then();
            if ((fetchedName !== "") && (previousCrumb === TABLES.TITLES || previousCrumb === TABLES.PUBLISHERS)) {
                if (previousCrumb === TABLES.TITLES) {
                    getStartYearByTableAndId(previousCrumb, id, setFetchedStartYear).then();
                }
                updatePreviousCrumb(breadcrumb);
                return <span className={"animate"}>{fetchedName + " " + fetchedStartYear || ""}</span>;
            }
        } else {
            return getTranslatedBreadcrumbName(breadcrumbName, breadcrumb);
        }
    }

    const printBreadCrumbLinkItems = (index, breadcrumb, match) => {
        let breadcrumbName = breadcrumb.props.children.toString().toLowerCase();
        let name = doIgnoreName && bcName !== "" && index === size ? bcName : getNameFromBreadcrumbName(breadcrumbName, breadcrumb);
        if (name) {
            if (index === size) {
                return (
                    <li className={"breadcrumb-item active"} aria-current={"page"} key={index}>
                        {name}
                    </li>
                )
            } else {
                return (
                    <li className={"breadcrumb-item"} key={index}>
                        <Link to={match.pathname}>{name}</Link>
                    </li>
                )
            }
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
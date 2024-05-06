import React, {useState} from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {Link, useParams} from "react-router-dom";
import {TABLES} from "../../helpers/constants/serviceConstants";
import {getNameByTableAndId, getStartYearByTableAndId} from "../../services/serviceFunctions";
import {BREADCRUMB_NAMES, LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


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
            case "add":
                return BREADCRUMB_NAMES.ADD;
            case "admin":
                return BREADCRUMB_NAMES.ADMIN;
            case "dashboard":
                return BREADCRUMB_NAMES.DASHBOARD;
            case "edit":
                return BREADCRUMB_NAMES.EDIT;
            case "grade values":
                return BREADCRUMB_NAMES.GRADE_VALUES;
            case "home":
                return BREADCRUMB_NAMES.HOME;
            case "issues":
                return BREADCRUMB_NAMES.ISSUES;
            case "marvelklubben":
                return BREADCRUMB_NAMES.MARVELKLUBBEN;
            case "messages":
                return BREADCRUMB_NAMES.MESSAGES;
            case "my titles":
                return BREADCRUMB_NAMES.MY_TITLES;
            case "collections":
                return BREADCRUMB_NAMES.COLLECTIONS;
            case "maps":
                return BREADCRUMB_NAMES.MAPS;
            case "overview":
                return BREADCRUMB_NAMES.OVERVIEW;
            case "profile":
                return BREADCRUMB_NAMES.PROFILE;
            case "publishers":
                return BREADCRUMB_NAMES.PUBLISHERS;
            case "titles":
                return BREADCRUMB_NAMES.TITLES;
            case "users":
                return BREADCRUMB_NAMES.USERS;
            case "valuation":
                return BREADCRUMB_NAMES.VALUATION;
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
        <nav aria-label={LABELS.COMMON.BREADCRUMB} className={"mb-5 breadcrumb-nav hide"}>
            <ol className="breadcrumb small">
                {breadcrumbs.map(({match, breadcrumb}, index) => {
                        return printBreadCrumbLinkItems(index, breadcrumb, match);
                    }
                )}
            </ol>
        </nav>
    );
}
import React from "react";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {Link} from "react-router-dom";
import {Debugger} from "./Debugger";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";


export const Breadcrumbs = () => {

    const breadcrumbs = useBreadcrumbs();
    const size = breadcrumbs ? breadcrumbs.length - 1 : 0;

    const getTranslatedBreadCrumbName = (breadcrumb) => {
        const name = breadcrumb.props.children.toString();
        switch (name.toLowerCase()) {
            case "home":
                return LABELS_AND_HEADINGS.HOME;
            case "admin":
                return LABELS_AND_HEADINGS.ADMIN;
            case "publishers":
                return LABELS_AND_HEADINGS.ALL_PUBLISHERS;
            case "edit":
                return LABELS_AND_HEADINGS.EDIT;
            default:
                return name;
        }
    }

    const printBreadCrumbLinkItems = (index, breadcrumb, match) => {
        if (index === size) {
            return (
                <li className={"breadcrumb-item active"} aria-current={"page"}>
                    {getTranslatedBreadCrumbName(breadcrumb)}
                </li>
            )
        } else {
            return (
                <li className={"breadcrumb-item"}>
                    <Debugger logThis={breadcrumb.props.children}/>
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
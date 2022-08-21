import React from "react";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {Link} from "react-router-dom";


export const Breadcrumbs = () => {

    const breadcrumbs = useBreadcrumbs();
    const size = breadcrumbs ? breadcrumbs.length - 1 : 0;

    const printBreadCrumbLinkItems = (index, breadcrumb, match) => {
        if (index === size) {
            return (
                <li className={"breadcrumb-item active"} aria-current={"page"}>
                    {breadcrumb}
                </li>
            )
        } else {
            return (
                <li className={"breadcrumb-item"}>
                    <Link to={match.pathname}>{breadcrumb}</Link>
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
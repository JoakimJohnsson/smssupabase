import React from "react";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {NavLink} from "react-router-dom";


export const Breadcrumbs = () => {

    const breadcrumbs = useBreadcrumbs();

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {breadcrumbs.map(({match, breadcrumb}) => {
                        return (
                            <li className="breadcrumb-item">
                                <NavLink to={match.pathname}>{breadcrumb}</NavLink>
                            </li>
                        )
                    }
                )}
            </ol>
        </nav>
    );
}
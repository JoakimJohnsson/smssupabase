import React from "react";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import linksData from "../../../../helpers/valueLists/links.json";
import {Link} from "react-router-dom";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";


export const OverviewLinks = () => {

    return linksData ?
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.SECTIONS.DASHBOARD.OVERVIEW.USEFUL_LINKS}</h2>
                <ul className={"list-unstyled"}>
                    {
                        linksData.map((link) => {
                            return (
                                <li key={link.id}>
                                    <Link className={"btn btn-outline-primary sms-btn"} to={link.url}>{link.url}</Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
        :
        <CustomSpinner className={"mb-3 d-block"}/>
}

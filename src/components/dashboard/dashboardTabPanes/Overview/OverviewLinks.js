import React from "react";
import {LABELS_AND_HEADINGS} from "../../../../helpers/constants/configConstants";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import linksData from "../../../../helpers/valueLists/links.json";
import {Link} from "react-router-dom";


export const OverviewLinks = () => {

    return linksData ?
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS_AND_HEADINGS.USEFUL_LINKS}</h2>
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

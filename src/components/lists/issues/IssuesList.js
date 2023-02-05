import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {IssueListItem} from "./IssueListItem";
import {Accordion} from "react-bootstrap";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";


export const IssuesList = ({issuesData, setIssuesData, showAdminInfo, title}) => {

    let groupedIssuesData = [];
    // Group issuesData by year
    if (issuesData) {
        groupedIssuesData = Object.values(issuesData.reduce((acc, x) => {
            acc[x.year] = [...(acc[x.year] || []), x];
            return acc;
        }, {}));
    }

    return issuesData && issuesData.length && groupedIssuesData.length && (
        <Accordion className={"sms-list--accordion mb-4"}>
            {
                groupedIssuesData.length ?
                    (groupedIssuesData.map((year, index) =>
                            <AccordionItem eventKey={index.toString()} key={index}>
                                <AccordionHeader as={"h3"} className={"pb-0 mb-0"}>{year[0].year}</AccordionHeader>
                                <AccordionBody>
                                    <ul className={"sms-list--with-tools mb-0"}>
                                        {
                                            year.length ?
                                                (year.sort((a, b) => a.number - b.number).map((issue, index) =>
                                                    <IssueListItem
                                                        key={issue.id}
                                                        index={index}
                                                        showAdminInfo={showAdminInfo}
                                                        issue={issue}
                                                        title={title}
                                                        setIssuesData={setIssuesData}
                                                        issuesData={issuesData}
                                                    />))
                                                :
                                                (<NoDataAvailable/>)
                                        }
                                    </ul>
                                </AccordionBody>
                            </AccordionItem>)
                    )
                    :
                    (<NoDataAvailable/>)
            }
        </Accordion>
    )
}

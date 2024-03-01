import React from "react";
import {PANES, ROUTES} from "../../../../helpers/constants";
import {valueIconDuoTone} from "../../../icons";
import {IconLinkCtaLg} from "../../../minis/IconLinkCtaLg";


export const OverviewIssuesValueComparison = ({oldValue, newValue, timeStamp}) => {

    const date = new Date(timeStamp);
    const dateString = date.toISOString().split('T')[0];

    return (
        <>
            {
                oldValue === newValue ?
                    (
                        <p>{PANES.OVERVIEW.COLLECTING_VALUE_6}</p>
                    )
                    :
                    (
                        oldValue < newValue ?
                            <p>
                                {PANES.OVERVIEW.COLLECTING_VALUE_2} <span
                                className={"text-success"}>+{newValue - oldValue}</span> kr {PANES.OVERVIEW.COLLECTING_VALUE_4} ({dateString}).
                            </p>
                            :
                            <p>
                                {PANES.OVERVIEW.COLLECTING_VALUE_3} <span
                                className={"text-danger"}>-{oldValue - newValue}</span> kr {PANES.OVERVIEW.COLLECTING_VALUE_4} ({dateString}).
                            </p>
                    )
            }
            <p>{PANES.OVERVIEW.COLLECTING_VALUE_5}</p>
            <IconLinkCtaLg
                variant={"primary"}
                icon={valueIconDuoTone}
                path={ROUTES.DASHBOARD.PATH_VALUATION}
                label={PANES.VALUATION.NAME}
            />
        </>
    )
}

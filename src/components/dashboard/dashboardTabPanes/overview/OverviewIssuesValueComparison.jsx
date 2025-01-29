import React from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {Icon, valueIconDuoTone} from "../../../icons";


export const OverviewIssuesValueComparison = ({oldValue, newValue, timeStamp}) => {

    const date = new Date(timeStamp);
    const dateString = date.toISOString().split('T')[0];

    return (
        <>
            <p>{PANES.OVERVIEW.COLLECTING_VALUE_1}</p>
            <div className={"text-grade"}>
                <p className={"fs-x-large py-3 px-5 d-flex align-items-center justify-content-center rounded border border-grade"}>
                    <Icon icon={valueIconDuoTone} size={"2x"} className={"me-3 "}/>
                    <span>{newValue + " kr"}</span>
                </p>
            </div>
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
        </>
    )
}

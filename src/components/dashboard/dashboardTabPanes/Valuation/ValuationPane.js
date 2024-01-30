import React, {useState} from "react";
import {PANES} from "../../../../helpers/constants";
import {useAppContext} from "../../../../context/AppContext";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {HeadingWithBreadCrumbs} from "../../../headings";


export const ValuationPane = () => {

    const {user} = useAppContext();
    const [loading, setLoading] = useState(true);

    if (loading) {
        setLoading(false);

    }

    return (
        <>
            <HeadingWithBreadCrumbs text={PANES.VALUATION.NAME}/>
            {
                loading ?
                    <CustomSpinner size={"4x"}/>
                    :
                    <div className={"row"}>
                        <div className={"sms-dashboard-col--sm"}>
                            {user.id}
                        </div>
                    </div>
            }
        </>
    )
}
